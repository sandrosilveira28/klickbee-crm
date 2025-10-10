import { create } from "zustand";
import toast from "react-hot-toast";
import { Deal } from "../types";
import { exportDealsToExcel, exportDealsWithColumns, exportSingleDealToExcel } from "../libs/excelExport";


interface DealStore {
  deals: Deal[];
  loading: boolean;
  error: string | null;

  fetchDeals: (ownerId?: string) => Promise<void>;
  addDeal: (deal: Omit<Deal, "id" | "ownerId" | "createdAt">) => Promise<void>;
  updateDeal: (id: string, deal: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
  exportAllDeals: (filename?: string) => void;
  exportSelectedDeals: (dealIds: string[], filename?: string) => void;
  exportSingleDeal: (dealId: string, filename?: string) => void;
  exportDealsWithColumns: (columns: (keyof Deal)[], filename?: string) => void;
}

export const useDealStore = create<DealStore>((set, get) => ({
  deals: [],
  loading: false,
  error: null,

  // 🧠 Fetch deals from API
  fetchDeals: async (ownerId?: string) => {
    set({ loading: true });
    try {
      const query = ownerId ? `?ownerId=${ownerId}` : "";
      const res = await fetch(`/api/admin/deals${query}`);
      if (!res.ok) throw new Error("Failed to fetch deals");

      const data: any[] = await res.json();
      const cleanData: Deal[] = data?.length ? data.map(data => { return {...data, owner: data.owner.name}}) : data;
      set({ deals: cleanData, loading: false });
    } catch (err: any) {
      console.error("fetchDeals error:", err);
      toast.error("Failed to load deals");
      set({ error: err.message, loading: false });
    }
  },

  // ➕ Add a new deal
  addDeal: async (deal) => {
    try {
      const res = await fetch(`/api/admin/deals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deal),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create deal");
      }

      const created: Deal = await res.json();
      set({ deals: [...get().deals, created] });
      toast.success("Deal created successfully!");
    } catch (err: any) {
      console.error("addDeal error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // ✏️ Update a deal
  updateDeal: async (id, deal) => {
    try {
      const res = await fetch(`/api/admin/deals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deal),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update deal");
      }

      const updated: Deal = await res.json();
      set({
        deals: get().deals.map((d) => (d.id === id ? updated : d)),
      });
      toast.success("Deal Updated successfully!");

    } catch (err: any) {
      console.error("updateDeal error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // ❌ Delete a deal
  deleteDeal: async (id) => {
    try {
      const res = await fetch(`/api/admin/deals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete deal");

      set({
        deals: get().deals.filter((d) => d.id !== id),
      });
      toast.success("Deal deleted successfully!");
    } catch (err: any) {
      console.error("deleteDeal error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // 📊 Export all deals to Excel
  exportAllDeals: (filename?: string) => {
    const { deals } = get();
    const result = exportDealsToExcel(deals, filename);
    if (result.success) {
      toast.success(`Deals exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // 📊 Export selected deals to Excel
  exportSelectedDeals: (dealIds: string[], filename?: string) => {
    const { deals } = get();
    const selectedDeals = deals.filter(deal => dealIds.includes(deal.id));
    if (selectedDeals.length === 0) {
      toast.error('No deals selected for export');
      return;
    }
    const result = exportDealsToExcel(selectedDeals, filename);
    if (result.success) {
      toast.success(`Selected deals exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // 📊 Export single deal to Excel
  exportSingleDeal: (dealId: string, filename?: string) => {
    const { deals } = get();
    const deal = deals.find(d => d.id === dealId);
    if (!deal) {
      toast.error('Deal not found');
      return;
    }
    const result = exportSingleDealToExcel(deal, filename);
    if (result.success) {
      toast.success(`Deal ${deal.dealName || 'Unknown'} exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // 📊 Export deals with custom columns
  exportDealsWithColumns: (columns: (keyof Deal)[], filename?: string) => {
    const { deals } = get();
    const result = exportDealsWithColumns(deals, columns, filename);
    if (result.success) {
      toast.success(`Deals exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },
}));

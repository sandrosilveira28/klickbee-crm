import { create } from "zustand";
import toast from "react-hot-toast";
import { Company } from "../types/types";
import { exportCompaniesToExcel, exportCompaniesWithColumns, exportSingleCompanyToExcel } from "../libs/excelExport";

interface CompanyStore {
  companies: Company[];
  loading: boolean;
  error: string | null;

  fetchCompanies: (ownerId?: string) => Promise<void>;
  addCompany: (company: Omit<Company, "id" | "ownerId" | "createdAt">) => Promise<void>;
  updateCompany: (id: string, company: Partial<Company>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  exportAllCompanies: (filename?: string) => void;
  exportSelectedCompanies: (companyIds: string[], filename?: string) => void;
  exportSingleCompany: (companyId: string, filename?: string) => void;
  exportCompaniesWithColumns: (columns: (keyof Company)[], filename?: string) => void;
}

export const useCompaniesStore = create<CompanyStore>((set, get) => ({
  companies: [],
  loading: false,
  error: null,

  // Fetch companies from API
  fetchCompanies: async (ownerId?: string) => {
    set({ loading: true });
    try {
      const query = ownerId ? `?ownerId=${ownerId}` : "";
      const res = await fetch(`/api/admin/companies${query}`);
      if (!res.ok) throw new Error("Failed to fetch companies");

      const data: Company[] = await res.json();
      set({ companies: data, loading: false });
    } catch (err: any) {
      console.error("fetchCompanies error:", err);
      toast.error("Failed to load companies");
      set({ error: err.message, loading: false });
    }
  },

  // Add a new company
  addCompany: async (company) => {
    try {
      const res = await fetch(`/api/admin/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create company");
      }

      const created: Company = await res.json();
      set({ companies: [...get().companies, created] });
    } catch (err: any) {
      console.error("addCompany error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // Update a company
  updateCompany: async (id, company) => {
    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update company");
      }

      const updated: Company = await res.json();
      set({
        companies: get().companies.map((c) => (c.id === id ? updated : c)),
      });

    } catch (err: any) {
      console.error("updateCompany error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // Delete a company
  deleteCompany: async (id) => {
    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete company");

      set({
        companies: get().companies.filter((c) => c.id !== id),
      });
      toast.success("Company deleted successfully!");
    } catch (err: any) {
      console.error("deleteCompany error:", err);
      toast.error(err.message);
      set({ error: err.message });
    }
  },

  // Export all companies to Excel
  exportAllCompanies: (filename?: string) => {
    const { companies } = get();
    const result = exportCompaniesToExcel(companies, filename);
    if (result.success) {
      toast.success(`Companies exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // Export selected companies to Excel
  exportSelectedCompanies: (companyIds: string[], filename?: string) => {
    const { companies } = get();
    const selectedCompanies = companies.filter(company => companyIds.includes(company.id));
    if (selectedCompanies.length === 0) {
      toast.error('No companies selected for export');
      return;
    }
    const result = exportCompaniesToExcel(selectedCompanies, filename);
    if (result.success) {
      toast.success(`Selected companies exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // Export single company to Excel
  exportSingleCompany: (companyId: string, filename?: string) => {
    const { companies } = get();
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      toast.error('Company not found');
      return;
    }
    const result = exportSingleCompanyToExcel(company, filename);
    if (result.success) {
      toast.success(`Company ${company.fullName || 'Unknown'} exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },

  // Export companies with custom columns
  exportCompaniesWithColumns: (columns: (keyof Company)[], filename?: string) => {
    const { companies } = get();
    const result = exportCompaniesWithColumns(companies, columns, filename);
    if (result.success) {
      toast.success(`Companies exported successfully!`);
    } else {
      toast.error(result.message);
    }
  },
}));
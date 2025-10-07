"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/libs/utils"
import Modal from "@/components/ui/Modal"
import ProspectForm from "./ProspectForm"

type DealSlideOverProps = {
  open: boolean
  onClose: () => void
}

export default function ProspectSlideOver({ open, onClose }: DealSlideOverProps) {
  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/admin/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to create prospect");
      const data = await response.json();
      console.log("Prospect created successfully:", data);
      onClose();
    } catch (err) {
      console.error("Error creating prospect:", err);
    }
  }
  return (
    <Modal open={open} onClose={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="deal-slide-title"
        className={cn(
          "pointer-events-auto fixed right-0 top-0 h-full bg-card border-l border-[var(--border-gray)] shadow-xl flex flex-col bg-white",
          "transition-transform duration-300 will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: "400px" }}
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-4 p-4 border-b border-[var(--border-gray)]">
          <h2 id="deal-slide-title" className="text-base font-semibold leading-[28px] text-pretty">
            Add New Prospect
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto ">
          <ProspectForm
            onCancel={onClose}
            onSubmit={(values) => handleSubmit(values)}
          />
        </div>
      </aside>
    </Modal>
  )
}

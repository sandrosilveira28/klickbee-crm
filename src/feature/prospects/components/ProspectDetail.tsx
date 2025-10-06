"use client";
import React from "react";
import DetailModal from "@/components/detailPage";
import type { Contact } from "../types/types";

// Helper function to render status badge
const renderStatusBadge = (status?: Contact['status']) => {
  const cls: Record<NonNullable<Contact['status']>, string> = {
    New: 'bg-[#E4E4E7] text-[#3F3F46]',
    Cold: 'bg-[#DBEAFE] text-[#1D4ED8]',
    'Warm Lead': 'bg-[#FEF3C7] text-[#92400E]',
    Qualified: 'bg-green-100 text-green-700',
    Converted: 'bg-teal-100 text-teal-700',
    'Not Interested': 'bg-[#FEE2E2] text-[#B91C1C]',
  };

  const classes = status ? cls[status] : 'bg-gray-100 text-gray-500';

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${classes}`}>
      {status ?? 'Unknown'}
    </span>
  );
}

interface ProspectDetailProps {
  isOpen: boolean;
  contact: Contact | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onAddNotes?: (id: string) => void;
  onExport?: (id: string) => void;
}

export default function ProspectDetail({
  isOpen,
  contact,
  onClose,
  onDelete,
  onEdit,
  onAddNotes,
  onExport,
}: ProspectDetailProps) {
  if (!contact) return null;

  const details = [
    { label: "Status", value: renderStatusBadge(contact.status) },
    {
      label: "Owner",
      value: (
        <span className="flex items-center gap-2">
          {contact.ownerAvatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={contact.ownerAvatar}
              alt={contact.owner ?? "Owner"}
              className="w-6 h-6 rounded-full"
            />
          )}
          {contact.owner ?? "-"}
        </span>
      ),
    },
    { label: "Company", value: contact.company ?? "-" },
    { label: "Email", value: contact.email ?? "-" },
    { label: "Phone", value: contact.phone ?? "-" },
    contact.tags && { label: "Tags", value: contact.tags },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <DetailModal
      isOpen={isOpen}
      title={contact.name ?? "Prospect Details"}
      details={details}
      onClose={onClose}
      onDelete={onDelete ? () => onDelete(contact.id) : undefined}
      onEdit={onEdit ? () => onEdit(contact.id) : undefined}
      onAddNotes={onAddNotes ? () => onAddNotes(contact.id) : undefined}
      onExport={onExport ? () => onExport(contact.id) : undefined}
    />
  );
}

import { z } from "zod";

const statusValues = [
  "New",
  "Cold",
  "Qualified",
  "Warmlead",
  "Converted",
  "Notintrested",
] as const;

export const createProspectSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  company: z.string().trim().min(1, "Company is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  status: z.enum(statusValues).default("New"),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  notes: z.string().optional().or(z.literal("")),
  ownerId: z.string(),
  userId: z.string(),
});

export const updateProspectSchema = z.object({
  id: z.string().trim().min(1),
  fullName: z.string().trim().optional(),
  company: z.string().trim().optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  status: z.enum(statusValues).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  notes: z.string().optional(),
});

export type CreateProspectInput = z.infer<typeof createProspectSchema>;
export type UpdateProspectInput = z.infer<typeof updateProspectSchema>;

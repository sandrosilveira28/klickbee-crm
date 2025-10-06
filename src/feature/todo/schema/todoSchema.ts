import { z } from "zod";

// Client form uses lowercase values; map them to Prisma enums (PascalCase)
const statusValues = ["todo", "inprogress", "onhold", "done"] as const;
const priorityValues = ["high", "urgent", "medium", "low"] as const;

export const createTodoSchema = z
  .object({
    taskName: z.string().trim().min(1, "Task name is required"),
    status: z.enum(statusValues).default("todo"),
    priority: z.enum(priorityValues).default("high"),
    linkedId: z.string().trim().min(1),
    assignedId: z.string().trim().optional().or(z.literal("")),
    dueDate: z.string().nullable().optional(),
    notes: z.string().optional().or(z.literal("")),
    files: z.any().optional(),
  })
  .transform((data) => ({
    ...data,
    // Map to Prisma enum casing
    status:
      data.status === "inprogress"
        ? "InProgress"
        : data.status === "onhold"
        ? "OnHold"
        : data.status === "done"
        ? "Done"
        : "Todo",
    priority:
      data.priority === "urgent"
        ? "Urgent"
        : data.priority === "medium"
        ? "Medium"
        : data.priority === "low"
        ? "Low"
        : "High",
  }));

export const updateTodoSchema = z
  .object({
    id: z.string().trim().min(1),
    taskName: z.string().trim().optional(),
    status: z.enum(statusValues).optional(),
    priority: z.enum(priorityValues).optional(),
    linkedId: z.string().trim().optional(),
    assignedId: z.string().trim().optional(),
    dueDate: z.string().nullable().optional(),
    notes: z.string().optional(),
    files: z.any().optional(),
  })
  .transform((data) => ({
    ...data,
    status:
      data.status === undefined
        ? undefined
        : data.status === "inprogress"
        ? "InProgress"
        : data.status === "onhold"
        ? "OnHold"
        : data.status === "done"
        ? "Done"
        : "Todo",
    priority:
      data.priority === undefined
        ? undefined
        : data.priority === "urgent"
        ? "Urgent"
        : data.priority === "medium"
        ? "Medium"
        : data.priority === "low"
        ? "Low"
        : "High",
  }));

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

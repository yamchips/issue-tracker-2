import { z } from "zod";
import { statuses } from "./issues/[id]/StatusSelector";

export const issuePostSchema = z.object({
  title: z
    .string({ message: "Title is required." })
    .min(3, { message: "Title is required." })
    .max(255, { message: "Max length is 255 characters." }),
  description: z
    .string({ message: "Description is required." })
    .min(1, { message: "Description is required." })
    .max(65535, { message: "Exceed max length." }),
});

export const issuePatchSchema = z.object({
  title: z
    .string({ message: "Title is required." })
    .min(3, { message: "Title is required." })
    .max(255, { message: "Max length is 255 characters." })
    .optional(),
  description: z
    .string({ message: "Description is required." })
    .min(1, { message: "Description is required." })
    .max(65535, { message: "Exceed max length." })
    .optional(),
  assignedUserId: z
    .string()
    .min(1, "AssignedUserId is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
});

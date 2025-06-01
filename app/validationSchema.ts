import { z } from "zod";

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

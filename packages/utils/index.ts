import { z } from "zod";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const CreateCapsuleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
  message: z.string().max(5000, "Message must be at most 5000 characters").optional(),
  unlockDate: z
    .string()
    .datetime({ message: "Unlock date must be a valid ISO date string" })
    .refine(
      (value) => new Date(value).getTime() > Date.now() + ONE_DAY_IN_MS,
      "Unlock date must be more than 24 hours from now",
    ),
});

export const UpdateCapsuleSchema = CreateCapsuleSchema.partial();

export type CreateCapsuleInput = z.infer<typeof CreateCapsuleSchema>;
export type UpdateCapsuleInput = z.infer<typeof UpdateCapsuleSchema>;

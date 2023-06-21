import { z } from "zod"

export const UserIdSchema = z.object({
  userId: z.string(),
  bindSecret: z.string(),
  bindWorkspaceId: z.string(),
})

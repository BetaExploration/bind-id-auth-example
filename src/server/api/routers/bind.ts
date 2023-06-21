import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { getIdHash } from "~/utils/hash"
import axios from "axios"
import { UserIdSchema } from "~/schemas"

export const bindRouter = createTRPCRouter({
  joinLink: publicProcedure.input(UserIdSchema).query(({ input }) => {
    const idHash = getIdHash(input.userId, input.bindSecret)
    const workspace = input.bindWorkspaceId

    const params = new URLSearchParams({
      idHash,
      userId: input.userId,
      workspace,
    })

    return `https://bind.ie/join?${params.toString()}`
  }),

  currentUser: publicProcedure.input(UserIdSchema).query(async ({ input }) => {
    const idHash = getIdHash(input.userId, input.bindSecret)

    try {
      interface BindUserByHashResponse {
        account: Record<string, unknown>
        hasDiscordLinked: boolean
        isGuildMember: boolean
      }

      const res = await axios.get<BindUserByHashResponse>(
        `https://bind.ie/api/user-by-hash`,
        {
          params: {
            idHash,
            userId: input.userId,
            workspace: input.bindWorkspaceId,
          },
        }
      )

      return res.data
    } catch (err) {
      console.error(err)
      return null
    }
  }),
})

import { z } from "zod"
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc"
import { env } from "~/env.mjs"
import { getIdHash } from "~/utils/hash"
import axios from "axios"

export const bindRouter = createTRPCRouter({
  joinLink: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId
    const idHash = getIdHash(userId, env.BIND_SECRET)
    const workspace = env.BIND_WORKSPACE

    const params = new URLSearchParams({
      idHash,
      userId,
      workspace,
    })

    return `https://bind.ie/join?${params.toString()}`
  }),

  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId
    const idHash = getIdHash(userId, env.BIND_SECRET)

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
            userId,
            workspace: env.BIND_WORKSPACE,
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

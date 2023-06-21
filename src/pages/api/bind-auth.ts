import { type NextApiRequest, type NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import qs from "node:querystring"
import { env } from "~/env.mjs"
import { getIdHash } from "~/utils/hash"

function bindAuth(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.token !== "string") {
    return res.status(400).json({ message: "Invalid token." })
  }

  try {
    const auth = getAuth(req)
    if (!auth.userId) {
      return res.redirect(`/sign-in?redirect=/api/bind-auth`)
    }
    const bindSecret = env.BIND_SECRET

    const idHash = getIdHash(auth.userId, bindSecret)

    const query = qs.stringify({
      token: req.query.token,
      idHash,
      userId: auth.userId,
    })

    // res.redirect(`http://localhost:3000/auth/external/verify?${query}`)
    res.redirect(`https://bind.ie/auth/external/verify?${query}`)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error." })
  }
}

export default bindAuth

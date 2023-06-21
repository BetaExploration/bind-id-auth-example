import { type NextApiRequest, type NextApiResponse } from "next"
import qs from "node:querystring"
import { env } from "~/env.mjs"
import { getIdHash } from "~/utils/hash"

// This is just a mock auth object. In your app, you would use your own authentication provider.
const auth = {
  userId: "123",
}

function bindAuth(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.token !== "string") {
    return res.status(400).json({ message: "Invalid token." })
  }

  const bindSecret = env.NEXT_PUBLIC_BIND_SECRET as string
  if (!bindSecret) {
    return res.status(500).json({
      message:
        "NEXT_PUBLIC_BIND_SECRET is not set. Set the environment variable to your secret to test this route.",
    })
  }

  try {
    if (!auth.userId) {
      return res.redirect(`/`)
    }

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

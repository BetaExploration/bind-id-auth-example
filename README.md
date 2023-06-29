# [Bind](https://bind.ie) External Authentication Example



## What is this?

This is an example of how you can integrate [Bind](https://bind.ie) with your product.

This example uses a Next.js project, set up using [t3stack](https://create.t3.gg/),
but your implementation should look very similar if you use Node.js.

## Test it out

See the example in action at [bind-id-auth-example.vercel.app/](bind-id-auth-example.vercel.app/).

1. Clone this repository
2. Run `npm i` to install dependencies
3. Copy `.env.example` to `.env.local` and fill in the values
3. Run `npm run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to set up your own App -> Bind -> Discord integration

1. Generate a url that users can use to join your Discord server, while also authorising with Bind:

```ts
// Example
const userId = ctx.auth.userId // Get your user id from your auth system
const idHash = getIdHash(userId, env.BIND_SECRET) // Get the id hash using the Bind secret and the user id
const workspace = env.BIND_WORKSPACE // Get the Bind workspace slug from your environment variables

const params = new URLSearchParams({
    idHash,
    userId,
    workspace,
}) // Create a URLSearchParams object with the parameters

return `https://bind.ie/join?${params.toString()}` // Construct the url
```

See `src/server/api/routers/bind.ts` for a working example.

2. Use the constructed url in your application to allow users to join your Discord server, and authenticate with Bind simultaneously.

## How to set up your own Discord -> App -> Bind integration

1. Configure Bind with your Discord guild.
2. Create a url that accepts a `token` query parameter, and sends the user identity back to Bind. For example:

```ts
import { type NextApiRequest, type NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import qs from "node:querystring"
import { env } from "~/env.mjs"
import { getIdHash } from "~/utils/hash"

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

    const idHash = getIdHash(auth.userId, bindSecret) // Get the id hash using the Bind secret and the user id

    const query = qs.stringify({
      token: req.query.token,
      idHash,
      userId: auth.userId,
    })

    res.redirect(`https://bind.ie/auth/external/verify?${query}`) // Redirect the user to Bind to complete the authentication
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error." })
  }
}

export default bindAuth

```

See `src/pages/api/bind-auth.ts` for a working example.
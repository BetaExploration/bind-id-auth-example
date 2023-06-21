import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import { api } from "~/utils/api"
import { TextInput } from "~/text-input"
import { env } from "~/env.mjs"

export default function Home() {
  const [userId, setUserId] = React.useState<string>("")
  const [workspaceId, setWorkspaceId] = React.useState<string>(
    env.NEXT_PUBLIC_BIND_WORKSPACE ?? ""
  )
  const [secret, setSecret] = React.useState<string>(
    env.NEXT_PUBLIC_BIND_SECRET ?? ""
  )

  const joinLinkQuery = api.bind.joinLink.useQuery(
    { userId, bindSecret: secret, bindWorkspaceId: workspaceId },
    { enabled: !!userId && !!secret && !!workspaceId }
  )

  return (
    <>
      <Head>
        <title>Bind integration example</title>
        <meta
          name="description"
          content="An example of integration with Bind"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#18181B] to-[#18181B]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="text-[hsl(280,100%,70%)]">Bind</span> integration
              example
            </h1>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-white">
              Use the controls below to see how Bind integrates into your app.
            </h2>
            <p className="text-l mt-2 font-normal tracking-tight text-white">
              Read source code to learn how to integrate Bind into your app.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-l border border-dashed bg-gray-900 py-12">
            <div className="mx-auto flex flex-col">
              <p className="mb-16 text-lg font-medium">
                Type in the user id to connect it with your Discord account on
                Bind
              </p>
              <form>
                <TextInput
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  label={"Your Bind secret:"}
                  type={"password"}
                  autoComplete={"off"}
                  aria-autocomplete={"none"}
                />
                <TextInput
                  value={workspaceId}
                  onChange={(e) => setWorkspaceId(e.target.value)}
                  label={"Your Bind workspace id:"}
                  type={"text"}
                  autoComplete={"off"}
                  aria-autocomplete={"none"}
                />
                <TextInput
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  label={"Your user id:"}
                  type={"text"}
                  autoComplete={"off"}
                  aria-autocomplete={"none"}
                />
              </form>
              <Link
                className={`border-1 mt-4 rounded-md border bg-gray-950 px-6 py-3 text-center font-bold ${
                  joinLinkQuery.data
                    ? "bg-[#5865F3] hover:bg-[#4752C4]"
                    : "bg-gray-700 hover:bg-gray-800"
                }`}
                href={joinLinkQuery.data ?? "#"}
              >
                Connect Discord
              </Link>
            </div>
            <div className="px-8 pt-8">
              <p className="text-md mb-4 mt-8">
                The button above navigates to this link:
              </p>
              <p>
                <code>
                  {joinLinkQuery.data ?? "Fill in user Id to see the link"}
                </code>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://bind.ie"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Go to Bind →</h3>
              <div className="text-lg">
                Jump to Bind to configure your workspace.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://docs.bind.ie"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn how to integrate Bind into your app.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

import Head from "next/head"
import Link from "next/link"
import { useAuth, UserButton } from "@clerk/nextjs"
import { api } from "~/utils/api"

export default function Home() {
  const joinLinkQuery = api.bind.joinLink.useQuery()
  const auth = useAuth()

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
          <div className="flex w-full flex-col gap-4 rounded-xl border border-dashed bg-gray-900 py-16">
            {auth.userId ? (
              <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center">
                  <span className="mr-4">Your profile: </span>
                  <UserButton afterSignOutUrl={"/"} />
                </div>
                <p>---</p>
                <p>
                  Join Bind (App -{">"} Bind -{">"} Discord) example:
                </p>
                <Link className="font-bold" href={joinLinkQuery.data ?? ""}>
                  Connect Discord
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Link href={"/sign-up"}>Sign up</Link>
                <Link href={"/sign-in"}>Sign in</Link>
              </div>
            )}
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

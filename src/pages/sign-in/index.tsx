import { SignIn, useAuth } from "@clerk/nextjs"
import { getAuth } from "@clerk/nextjs/server"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const auth = getAuth(ctx.req)
  if (auth.userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Page() {
  return <SignIn />
}

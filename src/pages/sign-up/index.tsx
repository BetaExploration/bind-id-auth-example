import { SignUp } from "@clerk/nextjs"
import { GetServerSidePropsContext } from "next"
import { getAuth } from "@clerk/nextjs/server"

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
  return <SignUp />
}

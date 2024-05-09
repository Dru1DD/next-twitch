import NextAuth, { AuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions: AuthOptions = {
  secret: "MXsqeQSZqvht5RE6U7Sg/EqtgKKctiyNm5qA0GoS/HM=",
  providers: [
    TwitchProvider({
      clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    }, 
    async session ({ session, token, user }) {
      return {...session, token }
    },
    async redirect({ url, baseUrl }) {
      return url
    },
    async jwt ({ token, user, account, profile }) {
      return {...token, ...account}
    }
  }
};

const handler =  NextAuth(authOptions)

export { handler as GET, handler as POST }

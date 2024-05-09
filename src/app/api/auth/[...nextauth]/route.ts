import NextAuth, { AuthOptions } from "next-auth";
import Twitch from "next-auth/providers/twitch";

export const authOptions: AuthOptions = {
  secret: "secret",
  providers: [
    Twitch({
      clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET || "",
      authorization: {
        params: {
          redirect_uri: 'http://localhost:3000/',
          scope: "openid user:read:email",
          claims: {
            id_token: {
              email: null,
              picture: null,
              preferred_username: null,
            },
          },
        },
      },
      idToken: true,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.preferred_username,
        email: profile.email,
        image: profile.picture,
      }
    },
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

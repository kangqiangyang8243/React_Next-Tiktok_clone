import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Router from "next/router";

export const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET

}

export default NextAuth(authOptions)
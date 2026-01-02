import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { cert } from "firebase-admin/app";

// Getting a necessary data from env file
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const AuthOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //     privateKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   }),
  // }),
  callbacks: {
    async session({ session, token }) {
      // session.user["id"] = token.sub as string;
      console.log(session);
      console.log(token);
      return session;
    },
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };

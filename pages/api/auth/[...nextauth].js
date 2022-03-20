import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { resolveHref } from "next/dist/shared/lib/router/router";

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "./lib/mongodb";


const days = 7; //change this value to change how long until an idle session expires

const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: "",
        password: "",
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        // console.log('!', user.result)
        if (res.status === 200) {
          return {
            id: user.result._id,
            email: user.result.email,
            firstName: user.result.firstName,
            lastName: user.result.lastName,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "../../login",
  },
  session: {
    strategy: "jwt",
    maxAge: days * 24 * 60 * 60, // n days * 24 hours * 60 minutes * 60 seconds -> n days in seconds
  },
  // callbacks: async functions that controls what happens after each action
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token._id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
  debug: false,
  // adapter: MongoDBAdapter(clientPromise),
};

export default (req, res) => NextAuth(req, res, options);

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
        if (res.status === 200) {
          return {
            _id: user.result._id,
            email: user.result.email,
            firstName: user.result.firstName,
            lastName: user.result.lastName,
            joined: user.result.joined,
            savedProps: user.result.savedProps,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) { // Override default Google profile options
        return {
          _id: profile.sub,
          name: profile.name,
          email: profile.email,
          lastName: profile.family_name,
          firstName: profile.given_name,
          image: profile.picture,
        }
      },
    }),
  ],
  pages: {
    signIn: "../../login",
  },
  session: {
    strategy: "jwt",
    maxAge: days * 24 * 60 * 60, // n days * 24 hours * 60 minutes * 60 seconds -> n days in seconds
  },
  // Callbacks: async functions that controls what happens after each action
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.joined = user.joined;
        token.savedProps = user.savedProps;

        if (user.image) {
          token.imageUrl = user.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user._id = token._id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.joined = token.joined;
      session.user.savedProps = token.savedProps;
      if (token.imageUrl)
      {
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
  },
  debug: false,
  // adapter: MongoDBAdapter(clientPromise),
};

export default (req, res) => NextAuth(req, res, options);
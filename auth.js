import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = await User.findOne({
            email: credentials?.email,
          });
          if (user) {
            const isMatch = bcrypt.compare(credentials.password, user.password);
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // This is where the user info is added to the token
      if (user) {
        token.name = user.username; // Adding user name to the token
        token.email = user.email; // Adding user email to the token
      }
      return token;
    },
    async session({ session, token }) {
      // Update the session object based on the token
      if (token) {
        session.user.name = token.name; // Here, you update the user name
        session.user.email = token.email;
      }
      return session;
    },
  },
});

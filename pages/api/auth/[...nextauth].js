import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import path from 'path';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + '/api/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
          });
          const data = await response.json();
          if (response.status === 200) {
            const user = data;
            return Promise.resolve(user);
          }
          return null;
        } catch (error) {
          console.error(error);
        }
      },
    })
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, trigger, user, session }) {
      if (trigger === "update") {
        token.user.ingredients = session.user.ingredients;
        token.user.recipes = session.user.recipes;
      }
      else if (user) {
        token.user = user;
      }
      return token;
    },
  },
}
export default NextAuth(authOptions)
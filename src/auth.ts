import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; 
import bcryptjs from 'bcryptjs';

import prisma from './lib/prisma';

// const authenticatedRoutes = [
//   "/checkout/address"
// ]

export const authConfig : NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnThisPage = authenticatedRoutes.includes(nextUrl.pathname);
    //   if (isOnThisPage) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return true;
    //   }
    //   return true;
    // },
    jwt({token, user}) {
      if(user) {
        token.data = user;
      }
      return token;
    },
    session({session, token, user}) {
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          // Form no valid
          if(!parsedCredentials.success) return null;

          const { email, password } = parsedCredentials.data;

          // Search the email
          const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
          if(!user) return null;

          // Compare the passwords
          if(!bcryptjs.compareSync(password, user.password)) return null;

          // return the user without the password
          const { password: _, ...rest } = user; 
          return rest;
      },
    }),
  ],
  trustHost: true
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
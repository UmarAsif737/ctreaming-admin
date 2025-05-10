import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./config/axios";
import { cookies } from "next/headers";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string; // Add additional fields here
    phone_number?: string;
    type?: string;
  }

  interface Session {
    user: {
      id?: string;
      phone_number?: string;
      type?: string;
    } & DefaultUser;
  }

  // If you use JWT for session management
  interface JWT {
    id?: string;
    phone_number?: string;
    type?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const credentialDetails = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const response = await axiosInstance.post(
            "/api/admin/auth/sign-in",
            credentialDetails,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          const user = response.data;

          if (user.success) {
            cookies().set("cookie-token", user.body.token, {
              expires: new Date(Date.now() + 60 * 60 * 10000)
            });
            return {
              id: user.body.user._id,
              email: user.body.user.email,
              name: user.body.user.full_name,
              type: user.body.user.type,
            };
          } else {
            // console.log("check your credentials");
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          // console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // First time JWT callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      // Session callback is called whenever a session for that particular user is checked
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          type: token.type as string,
        };
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };

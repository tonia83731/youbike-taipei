import NextAuth from "next-auth";
// import { CredentialsProvider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/helpers/auth";
import { ConnectDatabase } from "@/helpers/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await ConnectDatabase();
        const User = client.db().collection("users");

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid user.");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});

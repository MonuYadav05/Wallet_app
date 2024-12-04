import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("hi signin");

            // Validate the user and account objects
            if (!user?.email || !user?.name) {
                return false;
            }

            // Upsert user into the database
            await db.merchant.upsert({
                where: {
                    email: user.email,
                },
                create: {
                    email: user.email,
                    name: user.name,
                    auth_type: account?.provider === "google" ? "Google" : "Github",
                },
                update: {
                    name: user.name,
                    auth_type: account?.provider === "google" ? "Google" : "Github",
                },
            });

            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
};

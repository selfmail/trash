
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../lib/db.js";

export const auth = betterAuth({
 database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  plugins: [expo()],
  trustedOrigins: ["trash-company://"],
  emailAndPassword: {
    enabled: true
  }
});
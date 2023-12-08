import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";

const client = prisma_client;

export const auth = lucia({
	env: "DEV",
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false,
	},
	adapter: prisma(client),
});

export type Auth = typeof auth;

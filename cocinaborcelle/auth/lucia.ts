import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import prisma_client from "../prisma/index";

const client = prisma_client;

export const auth = lucia({
	env: "DEV",
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false,
	},
	adapter: prisma(client, {
		user: "usuario",
		key: "key",
		session: "session",
	}),

	getUserAttributes: (data) => {
		return {
			email: data.email,
			username: data.nome,
		};
	},
});

export type Auth = typeof auth;

import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import prisma_client from "../prisma/index";

export const auth = lucia({
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false,
	},
	adapter: prisma(prisma_client, {
		user: "usuario",
		key: "key",
		session: "session",
	}),

	getUserAttributes: (data) => {
		return {
			email: data.email,
			nome: data.nome,
		};
	},
});

export type Auth = typeof auth;

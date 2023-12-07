import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				senha: {},
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const usuario = await prisma.usuario.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!usuario) {
					return null;
				}

				const senhaReconhecida = credentials.senha == usuario.senha;

				if (!senhaReconhecida) {
					return null;
				}

				const user = {
					id: usuario.id.toString(),
					name: usuario.nome,
					email: usuario.email,
				};

				return user;
			},
		}),
	],
};

export default NextAuth(authOptions);

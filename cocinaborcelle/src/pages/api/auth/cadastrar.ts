import { auth } from "@/../auth/lucia";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma_client from "../../../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "POST") {
		res.status(405);
		res.end();
		return;
	}
	const { nome, password, email } = req.body as {
		nome: string;
		password: string;
		email: string;
	};

	try {
		const user = await auth.createUser({
			key: {
				providerId: "email",
				providerUserId: email.toLocaleLowerCase(),
				password,
			},
			attributes: {
				nome,
				email,
			},
		});

		await prisma_client.carrinho.create({
			data: { valor_cents: 0, usuarioId: user.userId },
		});

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		const authRequest = auth.handleRequest({
			req,
			res,
		});

		authRequest.setSession(session);
		res.status(200).json("Conta criada com sucesso");
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				res.status(400).json({
					error: "Email utilizado.",
				});
			}
		} else {
			res.status(500).json({ error: "Ocorreu um erro interno." });
		}
	}
	res.end();
};

export default handler;

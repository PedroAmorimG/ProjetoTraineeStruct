import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function createUser(data: any) {
	const prisma = new PrismaClient();
	console.log(data);

	await prisma.usuario.create({
		data: {
			nome: data.nome,
			email: data.email,
			senha: data.senha,
		},
	});
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	return new Promise((resolve) => {
		if (request.method == "POST") {
			const data = request.body;
			const prisma = new PrismaClient();

			createUser(data)
				.then(async () => {
					await prisma.$disconnect();
					response
						.status(200)
						.json({ message: "Usuario criado com sucesso." });
				})
				.catch(async (e) => {
					await prisma.$disconnect();
					response.status(400).json({ message: "Email existente." });
				});
		} else {
			response.status(500).json({ message: "Erro no servidor." });
		}
	});
}

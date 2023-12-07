import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function createUser(data: any) {
	const prisma = new PrismaClient();

	await prisma.usuario.create({
		data: {
			nome: data.nome,
			email: data.email,
			senha: data.senha,
		},
	});
}

type ResponseData = {
	message: string;
};

export default function handler(
	request: NextApiRequest,
	response: NextApiResponse<ResponseData>
) {
	if (request.method == "POST") {
		const data = request.body;
		const prisma = new PrismaClient();

		createUser(data.data)
			.then(async () => {
				await prisma.$disconnect();
				response
					.status(200)
					.json({ message: "Usuario criado com sucesso." });
			})
			.catch(async (e) => {
				console.error(e);
				await prisma.$disconnect();
				response.status(400).json({ message: "Email existente" });
			});
	} else {
		response.status(500).json({ message: `${request.method}` });
	}
}

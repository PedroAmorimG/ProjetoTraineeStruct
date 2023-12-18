import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/../prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.slug === "show" && req.method === "GET") {
		const { usuarioId } = req.body.data as {
			usuarioId: string;
		};
		try {
			const carrinho = await prisma.carrinho.findUnique({
				where: {
					usuarioId: usuarioId,
				},
			});
			const compras = await prisma.compra.findMany({
				where: {
					carrinhoId: carrinho?.id,
				},
			});
			res.status(200).json({
				data: {
					carrinho: carrinho,
					compras: compras,
				},
			});
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: "Erro interno." });
		}
	} else {
		res.status(405).json({ error: "Bad Request" });
	}
}

export default handler;

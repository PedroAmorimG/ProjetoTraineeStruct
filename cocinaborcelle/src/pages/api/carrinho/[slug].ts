import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.slug === "show" && req.method === "GET") {
		try {
			const usuarioId = req.body;
			const carrinho = await prisma.carrinho.findUnique({
				where: {
					usuarioId: usuarioId,
				},
				include: { compras: { include: { comida: true } } },
			});

			res.status(200).json({ carrinho });
		} catch (e) {
			res.status(500).json({ error: "Erro interno" });
		}
	} else if (req.query.slug === "update" && req.method === "PATCH") {
		try {
			const { carrinhoId, new_price } = req.body;
			await prisma.carrinho.update({
				where: {
					id: carrinhoId,
				},
				data: {
					valor_cents: { increment: new_price }, //TODO Aplicar essa API no cardapio
				},
			});
		} catch (e) {
			res.status(500).json({ error: "Erro interno" });
		}
	} else {
		res.status(405).json({ error: "Bad Request" });
	}
}

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import prisma_client from "../../../../prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.query.slug === "show" && req.method === "GET") {
		try {
			const usuarioId = req.body;
			const carrinho = await prisma_client.carrinho.findUnique({
				where: {
					usuarioId: usuarioId,
				},
			});
			const compras = await prisma_client.compra.findMany({
				where: {
					carrinhoId: carrinho?.id,
				},
			});
			res.status(200).json({
				carrinho: carrinho,
				compras: compras,
			});
		} catch (e) {
			res.status(500).json({ error: "Erro interno" });
		}
	} else {
		res.status(405).json({ error: "Bad Request" });
	}
}

export default handler;

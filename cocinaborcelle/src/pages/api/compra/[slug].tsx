import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.query.slug === "create" && req.method === "POST") {
		try {
			const data = req.body;
			const compra = await prisma.compra.create({ data });
			res.status(200).json(compra);
		} catch (e) {
			res.status(400).json({ error: "não foi possível criar" });
		}
	} else if (req.query.slug === "update" && req.method === "PATCH") {
		try {
			const { id, ...compraData } = req.body;
			const compra = await prisma.compra.update({
				where: { id },
				data: compraData,
			});
			res.status(200).json(compra);
		} catch (e) {
			res.status(400).json({ error: "não foi possível atualizar" });
		}
	} else if (req.query.slug === "delete" && req.method === "DELETE") {
		try {
			const where = req.body;
			const compra = await prisma.compra.delete({ where });
			res.status(200).json(compra);
		} catch (e) {
			res.status(400).json({ error: "não foi possível deletar" });
		}
	} else if (req.query.slug === "clear" && req.method === "DELETE") {
		try {
			const carrinhoId = req.body.data;
			await prisma.compra.deleteMany({
				where: {
					carrinhoId: carrinhoId,
				},
			});
			res.status(200);
		} catch (e) {
			res.status(500).json({ error: "Erro interno" });
		}
	} else {
		res.status(400).json({ error: "método da API não conhecido" });
	}
}

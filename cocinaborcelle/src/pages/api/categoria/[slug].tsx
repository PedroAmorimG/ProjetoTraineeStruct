import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
//
async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug === "index" && req.method === "GET") {
        try {
            const categorias = await prisma.categoria.findMany();
            res.status(200).json(categorias);
        } catch (e) {
            res.status(500).json({ error: "erro no servidor" });
        }
    }

    if (req.query.slug === "create" && req.method === "POST") {
        try {
            const data = req.body;
            const categoria = await prisma.categoria.create({ data });
            res.status(200).json(categoria);
        } catch (e) {
            res.status(400).json({ error: "não foi possível criar a categoria" });
        }
    }

    if (req.query.slug === "update" && req.method === "PATCH") {
        try {
            const { id, ...categoriaData } = req.body;
            const categoria = await prisma.categoria.update({
                where: { id },
                data: categoriaData,
            });
            res.status(200).json(categoria);
        } catch (e) {
            res.status(400).json({ error: "não foi possível atualizar a categoria" });
        }
    }

    if (req.query.slug === "delete" && req.method === "DELETE") {
        try {
            const where = req.body;
            const categoria = await prisma.categoria.delete({ where });
            res.status(200).json(categoria);
        } catch (e) {
            res.status(400).json({ error: "não foi possível deletar essa categoria" });
        }
    }
    res.status(400).json({ error: "método da API não conhecido" });
}

export default handler;
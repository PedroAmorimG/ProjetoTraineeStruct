import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug === "index" && req.method === "GET") {
        try {
        const comidas = await prisma.comida.findMany();
        res.status(200).json(comidas);
    }   catch (e) {
        res.status(500).json({ error: "erro no servidor" });
    }
    }

    if (req.query.slug === "create" && req.method === "POST") {
        try {
        const data = req.body;
        const comida = await prisma.comida.create({ data });
        res.status(200).json(comida);
    }   catch (e) {
        res.status(400).json({ error: "não foi possível criar" });
    }
    }

    if (req.query.slug === "update" && req.method === "PATCH") {
        try {
        const { id, ...comidaData } = req.body;
        const comida = await prisma.comida.update({
            where: { id },
            data: comidaData,
        });
        res.status(200).json(comida);
    }   catch (e) {
        res.status(400).json({ error: "não foi possível atualizar" });
    }
    }

    if (req.query.slug === "delete" && req.method === "DELETE") {
        try {
        const where = req.body;
        const comida = await prisma.comida.delete({ where });
        res.status(200).json(comida);
    }   catch (e) {
        res.status(400).json({ error: "não foi possível deletar" });
    }
    }
    res.status(400).json({ error: "método da API não conhecido" })
}

export default handler;
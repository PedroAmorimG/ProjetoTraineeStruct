import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../prisma/index"


async function showCardapio(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug === "index" && req.method === "GET") {
        try {
            const cardapio = await prisma.cardapio.findUnique( {
                where: {id: 1},
                include: {
                    categorias: {
                        include: {
                            comidas: true
                        }
                    }
                }
            } )
            res.status(200).json(cardapio)
        }
        catch (e) {
            res.status(500).json( { error: "Erro no servidor" } )
        }
    }

}

export default showCardapio;

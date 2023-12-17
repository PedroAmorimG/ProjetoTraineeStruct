import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client" 

const prisma = new PrismaClient()

async function showRestaurante(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug === "index" && req.method === "GET") {
        try {
            const restaurantes = await prisma.restaurante.findMany( {
                include: {
                    rede_social: true,
                    localizacao: true,
                }
            } )
            res.status(200).json(restaurantes)
        }
        catch (e) {
            res.status(500).json( { error: "Erro no servidor" } )
        }
    }

    if(req.query.slug === "show" && req.method === "GET") {
        
        try {
            const where = req.body
            const restaurante = await prisma.restaurante.findUnique( {
                where,
                include: {
                    rede_social: true,
                    localizacao: true,
                } 
            } )

            if(!restaurante) {
                res.status(404).json( {erro: `Restaurante com ID ${where} não encontrado`} )
            }
            
            res.status(200).json(restaurante)
        } catch(e) {
            res.status(500).json( {error: "Erro ao buscar restaurante"} )
        }
    }
}

export default showRestaurante;

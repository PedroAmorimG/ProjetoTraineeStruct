import { NextApiRequest, NextApiResponse } from "next"

export type RestaurantType = {
    name: string,
    descricao: string,
    telefone: number,
    social: string,
    localizacao: []
}

export async function handler (req: NextApiRequest, res: NextApiResponse<RestaurantType>) {
    if (req.method == "GET") {
        const { slug } = req.query
        const restaurant = await prisma.restaurant.findUnique({where : { slug }})
        
        if (restaurant){
            res.status(200).json(restaurant)
        }if(!restaurant){
            res.status(500).json("ERRO AO CONSULTAR")
        }
            
    }
}
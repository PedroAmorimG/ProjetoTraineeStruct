import { Cardapio, Categoria, Comida } from "@prisma/client"
import  api  from "../api"

type CardapioFull = {
    categoria: Categoria,
} & Comida[]



async function getCardapio(): Promise<CardapioFull>{
    const {data} = await api.get("/cardapio/index")
    
    return data
}

export default getCardapio
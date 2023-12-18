import { Comida } from "@prisma/client";
import api from "../api";

type ComidaIdentifier = {id: number}
type ComidaNewData = {
    nome: string;
    preco_cents: number;
    descricao: string;
    categoriaId: number; 
}

async function updateComida(comidaData: ComidaIdentifier & ComidaNewData): Promise<Comida> {
    const {data} = await api.patch("/comida/update", comidaData)
    return data
}

export default updateComida
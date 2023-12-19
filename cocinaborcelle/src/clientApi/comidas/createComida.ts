import { Comida } from "@prisma/client";
import api from "../api";

type NewComida = {
    nome: string;
    preco_cents: number;
    descricao: string;
    categoriaId: number; 
}

async function createComida(newComida: NewComida): Promise<Comida> {
    const { data } = await api.post("/comida/create", newComida);
    return data; 
}

export default createComida;
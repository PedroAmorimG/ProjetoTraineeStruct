import { Categoria } from "@prisma/client";
import api from "../api";

type NewCategoria = {
    nome: string;
};

async function createCategoria(newCategoria: NewCategoria): Promise<Categoria> {
    try {
        const { data } = await api.post("/categoria/create", newCategoria);
        return data;
    } catch (error) {
        throw new Error("Erro ao criar Categoria");
    }
}

export default createCategoria;
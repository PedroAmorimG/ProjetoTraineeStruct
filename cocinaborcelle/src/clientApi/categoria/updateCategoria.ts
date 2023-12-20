import { Categoria } from "@prisma/client";
import api from "../api";

type CategoriaIdentifier = { id: number };
type CategoriaNewData = {
    nome: string;
};

async function updateCategoria(categoriaData: CategoriaIdentifier & CategoriaNewData): Promise<Categoria> {
    try {
        const { data } = await api.patch(`/categoria/update/${categoriaData.id}`, categoriaData);
        return data;
    } catch (error) {
        // Handle error, e.g., log or throw a custom error
        throw new Error("Não foi possível fazer o Update dessa Categoria");
    }
}

export default updateCategoria;
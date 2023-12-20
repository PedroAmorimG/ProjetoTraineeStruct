import { Categoria } from "@prisma/client";
import api from "../api";

type CategoriaIdentifier = {
    cardapioId: number;
};

async function deleteCategoria(categoriaIdentifier: CategoriaIdentifier): Promise<Categoria> {
    try {
        const { data } = await api.delete(`/categoria/delete/${categoriaIdentifier.cardapioId}`);
        return data;
    } catch (error) {
        throw new Error("Não foi possível deletar a Categoria");
    }
}

export default deleteCategoria;
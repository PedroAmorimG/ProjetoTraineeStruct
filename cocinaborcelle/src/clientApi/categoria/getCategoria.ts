import { Categoria } from "@prisma/client";
import api from "../api";

async function getCategorias(): Promise<Categoria[]> {
    const { data } = await api.get("/categoria/list");

    return data;
}

export default getCategorias;
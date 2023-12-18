import { Comida } from "@prisma/client";
import api from "../api";

type ComidaIdentifier = {
    id: number;
};

async function deleteComida(comidaIdentifier: ComidaIdentifier): Promise<Comida> {
    const { data } = await api.delete("/comida/delete", { data: comidaIdentifier });
    return data;
}

export default deleteComida
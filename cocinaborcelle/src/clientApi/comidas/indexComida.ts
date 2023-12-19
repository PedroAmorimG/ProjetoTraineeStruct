import { Comida } from "@prisma/client";
import api from "../api";

async function getComidas(): Promise<Comida[]> {
    const {data}  = await api.get("/comida/index")

    return data
}

export default getComidas;
import { Compra } from "@prisma/client";
import api from "../api";

type NewCompra = {
    quantidade?: number;
    carrinhoId: number;
    comidaId: number;
};

async function createCompra(newCompra: NewCompra): Promise<Compra> {
    const { data } = await api.post("/compra/create", newCompra);
    return data; 
}

export default createCompra;
import { Compra } from "@prisma/client";
import api from "../api";

type CompraIdentifier = {id: number}
type CompraNewData = {
    quantidade?: number;
}

async function updateCompra(compraData: CompraIdentifier & CompraNewData): Promise<Compra> {
    const {data} = await api.patch("/compra/update", compraData)
    return data
}

export default updateCompra
import { Compra } from "@prisma/client";
import api from "../api";

type CompraIdentifier = {
    id: number;
};

async function deleteCompra(compraIdentifier: CompraIdentifier): Promise<Compra> {
    const { data } = await api.delete("/gender/delete", { data: compraIdentifier });
    return data;
}

export default deleteCompra
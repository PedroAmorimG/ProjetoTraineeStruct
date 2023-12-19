import { Carrinho, Compra } from "@prisma/client";
import api from "../api";

export type CarrinhoCompleto = { carrinho: Carrinho & Compra };

async function getCarrinho(usuarioId: string): Promise<CarrinhoCompleto> {
	const { data } = await api.get("/carrinho/show", { data: usuarioId });
	return data;
}

export default getCarrinho;

import { Carrinho, Compra } from "@prisma/client";
import api from "../api";

type CarrinhoCompleto = {
	carrinho: Carrinho;
	compras: Compra[];
};

async function getCarrinho(usuarioId: string): Promise<CarrinhoCompleto> {
	const { data } = await api.get("/carrinho/show", { data: usuarioId });
	return data;
}

export default getCarrinho;

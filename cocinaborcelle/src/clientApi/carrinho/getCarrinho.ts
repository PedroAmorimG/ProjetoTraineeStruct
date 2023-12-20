import { Prisma } from "@prisma/client";
import api from "../api";

export type CarrinhoCompleto = {
	carrinho: Prisma.CarrinhoGetPayload<{
		include: {
			compras: { include: { comida: true } };
		};
	}>;
};

async function getCarrinho(usuarioId: string): Promise<CarrinhoCompleto> {
	const { data } = await api.get("/carrinho/show", { data: usuarioId });
	return data;
}

export default getCarrinho;

import { Prisma } from "@prisma/client";
import api from "../api";

type CardapioFull = {
	cardapio: Prisma.CardapioGetPayload<{
		include: {
			categorias: {
				include: { comidas: true };
			};
		};
	}>;
};

async function getCardapio(): Promise<CardapioFull> {
	const { data } = await api.get("/cardapio/index");

	return data;
}

export default getCardapio;

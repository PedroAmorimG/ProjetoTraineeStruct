import api from "../api";

async function updateCarrinho(carrinhoId: number, price_cents: number) {
	await api.patch("/carrinho/update", {
		data: { carrinhoId: carrinhoId, new_price: price_cents },
	});
}

export default updateCarrinho;

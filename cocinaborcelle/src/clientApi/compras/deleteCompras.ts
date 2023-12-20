import api from "../api";

export default async function clearCompras(carrinhoId: number) {
	await api.delete("/compra/clear", { data: carrinhoId });
}

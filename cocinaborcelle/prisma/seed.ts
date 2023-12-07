import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.restaurante.create({
		data: {
			nome: "Cocina Borcelle",
			descricao: "A melhor comida italiana",
			telefone: "0000-0000",
			localizacao: {
				create: {
					rua: "Rua Coliseu",
					cidade: "Roma 2",
					maps: "https://maps.app.goo.gl/p4BxdRvuWxzNLoxQ8",
				},
			},
			rede_social: {
				create: {
					instagram: "https://www.instagram.com/",
					facebook: "https://www.facebook.com/",
				},
			},
			cardapio: {
				create: {
					categorias: {
						create: [
							{
								nome: "Prato principal",
								comidas: {
									create: [
										{
											nome: "Ravioli",
											preco_cents: 5999,
											descricao:
												"Trigo, ovos, molho de tomate",
										},
										{
											nome: "Risoto",
											preco_cents: 7999,
											descricao:
												"Arroz arbório, alho-poró, bacon, legumes",
										},
										{
											nome: "Macarrão à carbonara",
											preco_cents: 6999,
											descricao:
												"Espaguete, bacon, ovo, queijo",
										},
									],
								},
							},
							{
								nome: "Bebidas",
								comidas: {
									create: [
										{
											nome: "Água mineral",
											preco_cents: 300,
											descricao:
												"H2O colhida de rios divinos",
										},
										{
											nome: "Vinho tinto",
											preco_cents: 5549,
											descricao: "Taça do vinho da casa",
										},
										{
											nome: "Suco",
											preco_cents: 678,
											descricao:
												"Todos os sabores existentes",
										},
									],
								},
							},
						],
					},
				},
			},
		},
	});
	await prisma.usuario.create({
		data: {
			nome: "teste",
			email: "teste@gmail.com",
			senha: "teste",
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

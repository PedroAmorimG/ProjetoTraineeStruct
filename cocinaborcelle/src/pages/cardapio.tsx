import CardCardapio from "@/components/CardCardapio";
import style from "@/styles/Cardapio.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import getCardapio from "@/clientApi/cardapio/getCardapio";
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import getCarrinho from "@/clientApi/carrinho/getCarrinho";
import getUser from "../../auth/getUser";
import createCompra from "@/clientApi/compras/createCompra";

export const getServerSideProps = (async (
	context: GetServerSidePropsContext
) => {
	const cardapio = await getCardapio();
	const user = await getUser(context);
	if (user) {
		const carrinho = await getCarrinho(user.userId);
		return { props: { cardapio: cardapio, carrinho: carrinho } };
	}
	return { props: { cardapio: cardapio, carrinho: null } };
}) satisfies GetServerSideProps;

export default function TestCard(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const handleBuy = async (comidaId: number, carrinhoId: number) => {
		await createCompra({
			quantidade: 1,
			comidaId: comidaId,
			carrinhoId: carrinhoId,
		}).catch(() => {
			alert("Nao foi possivel efetuar a compra.");
		});
	};

	if (!props.carrinho) {
		return (
			<div className={style.pag}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<style>{dom.css()}</style>
				</Head>
				{props.cardapio.cardapio.categorias.map((categoria) => {
					return (
						<div className={style.cats}>
							<h2>{categoria.nome}</h2>
							{categoria.comidas.map((comida) => {
								return (
									<CardCardapio
										name={comida.nome}
										price={comida.preco_cents}
										desc={comida.descricao}
									></CardCardapio>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}

	return (
		<div className={style.pag}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<style>{dom.css()}</style>
			</Head>
			{props.cardapio.cardapio.categorias.map((categoria) => {
				return (
					<div className={style.cats}>
						<h2>{categoria.nome}</h2>
						{categoria.comidas.map((comida) => {
							return (
								<CardCardapio
									name={comida.nome}
									price={comida.preco_cents}
									desc={comida.descricao}
								>
									<button
										className={style.button}
										onClick={(e) => {
											handleBuy(
												comida.id,
												props.carrinho.carrinho.id
											);
										}}
									>
										<FontAwesomeIcon
											className={style.icon}
											icon={faCartShopping}
											size="2xl"
										/>
									</button>
								</CardCardapio>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

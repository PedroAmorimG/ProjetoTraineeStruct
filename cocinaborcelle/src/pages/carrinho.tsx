import getCarrinho, {
	CarrinhoCompleto,
} from "@/clientApi/carrinho/getCarrinho";
import style from "@/styles/Carrinho.module.css";
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import getUser from "../../auth/getUser";
import Link from "next/link";
import CardCardapio from "@/components/CardCardapio";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

import { Manrope } from "next/font/google";
import deleteCompra from "@/clientApi/compras/deleteCompra";
import Head from "next/head";
import clearCompras from "@/clientApi/compras/deleteCompras";
import { useEffect, useState } from "react";

const manrope = Manrope({ subsets: ["latin"] });

export const getServerSideProps = (async (
	context: GetServerSidePropsContext
) => {
	const user = await getUser(context);
	if (user) {
		return { props: user };
	}
	return {
		redirect: {
			destination: "/login",
			permanent: false,
		},
	};
}) satisfies GetServerSideProps;

export default function Carrinho(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	async function handleDelete(id: number) {
		deleteCompra({ id })
			.then(() => getCarrinho(props.userId))
			.then((carrinho) => setCarrinho(carrinho))
			.catch((e) => alert("Ocorreu um erro."));
	}

	async function handleCompra(id: number) {
		clearCompras(id)
			.then(() => getCarrinho(props.userId))
			.then((carrinho) => setCarrinho(carrinho))
			.catch((e) => {
				alert("Erro interno.");
			});
	}

	const [carrinho, setCarrinho] = useState<CarrinhoCompleto>();

	useEffect(() => {
		getCarrinho(props.userId).then((carrinho) => {
			console.log(carrinho);
		});
	}, []);

	return carrinho?.carrinho?.compras.length ? (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<style>{dom.css()}</style>
			</Head>
			<div className={style.pag} style={manrope.style}>
				<h3 className={style.h3}>Carrinho</h3>
				{carrinho.carrinho.compras.map((compra) => {
					return (
						<div className={style.item}>
							<p className={style.quantidade}>
								Quantidade: {compra.quantidade}{" "}
							</p>
							<CardCardapio
								name={compra.comida.nome}
								price={compra.comida.preco_cents}
								desc={compra.comida.descricao}
							>
								<button
									className={style.delete}
									onClick={(e) => handleDelete(compra.id)}
								>
									<FontAwesomeIcon
										className={style.icon}
										icon={faTrash}
										size="xl"
									/>
								</button>
							</CardCardapio>
						</div>
					);
				})}
				<div className={style.divCompra}>
					<button
						className={style.comprar}
						onClick={(e) => handleCompra(carrinho.carrinho.id)}
					>
						Compre agora!
					</button>
				</div>
			</div>
		</>
	) : (
		<div className={style.pag} style={manrope.style}>
			<h3 className={style.h3}>
				O seu carrinho da Cocina Borcelle está vazio.
			</h3>
			<div className={style.aviso}>
				<p className={style.p}>Dê um proposito a ele, visite nosso</p>
				<Link className={style.link} href="/">
					Cardapio
				</Link>
			</div>
		</div>
	);
}

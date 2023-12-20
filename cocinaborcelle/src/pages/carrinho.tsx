import getCarrinho from "@/clientApi/carrinho/getCarrinho";
import style from "@/styles/Carrinho.module.css";
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import getUser from "../../auth/getUser";
import Link from "next/link";
import CardCardapio from "@/components/CardCardapio";

export const getServerSideProps = (async (
	context: GetServerSidePropsContext
) => {
	const user = await getUser(context);
	if (user) {
		const carrinho = await getCarrinho(user?.userId);
		return { props: carrinho };
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
	if (props.carrinho.compras.length) {
		return (
			<div className={style.pag}>
				{props.carrinho.compras.map((compra) => {
					return <div> </div>;
				})}
			</div>
		);
	}
	return (
		<div className={style.pag}>
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

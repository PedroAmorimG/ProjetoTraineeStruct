import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getRestaurante from "@/clientApi/restaurantes/getRestaurante";
import style from '@/styles/contato.module.css'
import styles from "@/styles/Login.module.css";
import Head from "next/head";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  const restaurante = await getRestaurante({id: 1})
  return { props: { restaurante } };
}) satisfies GetServerSideProps;


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <>
        <Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<style>{dom.css()}</style>
		</Head>

        <div className={style.image}></div> 
        <main style={manrope.style} className={style.main}>
				<form className={style.form} >
					<img
						className={style.logo}
						src="/cocina-logo-cropped.png"
						alt="Logo Cocina"
					></img>
					<h1 className={style.title}>Contatos</h1>
                    <h2>{props.restaurante?.telefone}</h2>
                    <a href="https://www.facebook.com" target="_blank">
                        <img src="/facepreto.png" alt="Facebook" width="45" height="45"/> 
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <img src="/instapreto.png" alt="Instagram" width="50" height="50"/>
                    </a>
					<hr className={style.hr}></hr>
				</form>
			</main>

    </>
    );
}
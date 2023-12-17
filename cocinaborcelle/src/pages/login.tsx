import styles from "@/styles/Login.module.css";

import InputLogin from "@/components/InputLogin";
import ButtonLogin from "@/components/ButtonLogin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

import Link from "next/link";
import Head from "next/head";
import { Manrope } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";

import { auth } from "@/../auth/lucia";

const manrope = Manrope({ subsets: ["latin"] });

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
	const authRequest = auth.handleRequest(context);
	const session = await authRequest.validate();
	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};

export default function Login() {
	const [form, setForm] = useState({
		email: "",
		senha: "",
	});

	const [erroLogin, setErroLogin] = useState(false);

	const router = useRouter();

	const [isempty, setIsempty] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let aux_form: any = form;
		aux_form[e.target.name] = e.target.value;
		setForm({ ...aux_form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let campos_vazios = Object.values(form).some((val) => val == "");
		setIsempty(campos_vazios);

		if (!campos_vazios) {
			axios
				.post("/api/auth/login", {
					email: form.email,
					password: form.senha,
				})
				.then((response) => {
					if (response.status == 200) {
						router.push("/");
					}
				})
				.catch((e) => {
					setErroLogin(true);
				});
		}
	};

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<style>{dom.css()}</style>
			</Head>
			<main style={manrope.style} className={styles.main}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<img
						className={styles.logo}
						src="/cocina-logo-cropped.png"
						alt="Logo Cocina"
					></img>
					<h1 className={styles.title}>Fazer login</h1>
					{erroLogin && (
						<p className={styles.p}>Email ou senha nao coincidem</p>
					)}
					<InputLogin
						type="email"
						name="email"
						placeholder="E-mail"
						onChange={handleChange}
					>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faEnvelope}
							size="lg"
						/>
					</InputLogin>
					{isempty && form["email"] == "" && (
						<p className={styles.p}>
							O campo do e-mail deve ser preenchido
						</p>
					)}
					<InputLogin
						type="password"
						name="senha"
						placeholder="Senha"
						onChange={handleChange}
					>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faKey}
							size="lg"
						/>
					</InputLogin>
					{isempty && form["senha"] == "" && (
						<p className={styles.p}>
							O campo da senha deve ser preenchido
						</p>
					)}
					<Link href="#" className={styles.esqueceu}>
						Esqueceu a senha?
					</Link>
					<ButtonLogin type="submit">Entrar</ButtonLogin>
					<hr className={styles.hr}></hr>
					<Link className={styles.cadastro} href="cadastro">
						<ButtonLogin type="button">Criar conta</ButtonLogin>
					</Link>
				</form>
			</main>
		</>
	);
}

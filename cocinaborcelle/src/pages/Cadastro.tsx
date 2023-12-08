"use client";

import styles from "@/styles/Cadastro.module.css";

import InputLogin from "@/components/InputLogin";
import ButtonLogin from "@/components/ButtonLogin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faKey,
	faEnvelope,
	faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";

import Head from "next/head";
import { useRouter } from "next/router";
import { Manrope } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";

const manrope = Manrope({ subsets: ["latin"] });

import axios from "axios";

export default function Cadastro() {
	const [form, setForm] = useState({
		nome: "",
		email: "",
		senha: "",
		confsenha: "",
	});
	const [isempty, setIsempty] = useState(false);
	const [isequal, setIsequal] = useState(false);
	const [validpass, setValidpass] = useState(false);

	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let aux_form: any = form;
		aux_form[e.target.name] = e.target.value;
		setForm({ ...aux_form });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let campos_vazios = Object.values(form).some((val) => val == "");
		setIsempty(campos_vazios);

		let senha_invalida = form["senha"].length < 8;
		setValidpass(senha_invalida);

		let senhas_diferentes = form["senha"] != form["confsenha"];
		setIsequal(senhas_diferentes);

		if (!campos_vazios && !senha_invalida && !senhas_diferentes) {
			axios
				.post("/api/Cadastrar", {
					nome: form.nome,
					senha: form.senha,
					email: form.email,
				})
				.then((response) => {
					console.log(response.data, response.status);
					if (response.status == 200) {
						router.push("Login");
					}
				})
				.catch((error) => {
					console.log(error);
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
				<form
					className={styles.form}
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
						handleSubmit(e);
					}}
				>
					<img
						className={styles.logo}
						src="/cocina-logof.png"
						alt="Logo Cocina"
					/>
					<h1 className={styles.title}>Cadastrar</h1>

					<InputLogin
						type="text"
						placeholder="Nome"
						name="nome"
						onChange={(e) => handleChange(e)}
					>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faSignature}
							size="lg"
						/>
					</InputLogin>
					{isempty && form["nome"] == "" && (
						<p className={styles.p}>
							O campo do nome deve ser preenchido
						</p>
					)}

					<InputLogin
						type="email"
						placeholder="E-mail"
						name="email"
						onChange={(e) => handleChange(e)}
					>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faEnvelope}
							size="lg"
						/>
					</InputLogin>
					{isempty && form["email"] == "" && (
						<p className={styles.p}>
							O campo do email deve ser preenchido
						</p>
					)}

					<InputLogin
						type="password"
						placeholder="Senha"
						name="senha"
						onChange={(e) => handleChange(e)}
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
					{validpass && form["senha"].length < 8 && (
						<p className={styles.p}>
							A senha deve conter 8 ou mais caracteres
						</p>
					)}

					<InputLogin
						type="password"
						placeholder="Confirme a senha"
						name="confsenha"
						onChange={(e) => handleChange(e)}
					>
						<FontAwesomeIcon
							className={styles.icon}
							icon={faKey}
							size="lg"
						/>
					</InputLogin>
					{isempty && form["confsenha"] == "" && (
						<p className={styles.p}>
							O campo de confirmar senha deve ser preenchido
						</p>
					)}
					{isequal && (
						<p className={styles.p}>
							Os campos de senha devem coincidir
						</p>
					)}

					<ButtonLogin type="submit">Cadastrar-se</ButtonLogin>
				</form>
			</main>
		</>
	);
}

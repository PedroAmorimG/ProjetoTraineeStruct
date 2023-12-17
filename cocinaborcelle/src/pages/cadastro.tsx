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
import axios from "axios";
import { useUser } from "../../utils/userContext";

const manrope = Manrope({ subsets: ["latin"] });

export default function Cadastro() {
	const user = useUser();
	const router = useRouter();
	if (user) {
		router.push("/");
	}

	const [form, setForm] = useState({
		nome: "",
		email: "",
		senha: "",
		confsenha: "",
	});
	const [isempty, setIsempty] = useState(false);
	const [isequal, setIsequal] = useState(false);
	const [validpass, setValidpass] = useState(false);
	const [falhaCriacao, setFalhaCriacao] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let campos_vazios = Object.values(form).some((val) => val == "");
		setIsempty(campos_vazios);

		let senha_invalida = form["senha"].length < 8;
		setValidpass(senha_invalida);

		let senhas_diferentes = form["senha"] != form["confsenha"];
		setIsequal(senhas_diferentes);

		if (!campos_vazios && !senha_invalida && !senhas_diferentes) {
			await axios
				.post("/api/auth/cadastrar", {
					nome: form.nome,
					password: form.senha,
					email: form.email,
				})
				.then((response) => {
					if (response.status == 200) {
						router.push("/");
					}
				})
				.catch((e) => {
					setFalhaCriacao(true);
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
					method="post"
					action="/api/auth/cadastrar"
					className={styles.form}
					onSubmit={handleSubmit}
				>
					<img
						className={styles.logo}
						src="/cocina-logof.png"
						alt="Logo Cocina"
					/>
					<h1 className={styles.title}>Cadastrar</h1>

					{falhaCriacao && (
						<p className={styles.p}>
							Nome de usuario ou email ja cadastrados.
						</p>
					)}

					<InputLogin
						type="text"
						placeholder="Nome"
						name="nome"
						onChange={handleChange}
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
							O campo do email deve ser preenchido
						</p>
					)}

					<InputLogin
						type="password"
						placeholder="Senha"
						name="senha"
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
					{validpass && form["senha"].length < 8 && (
						<p className={styles.p}>
							A senha deve conter 8 ou mais caracteres
						</p>
					)}

					<InputLogin
						type="password"
						placeholder="Confirme a senha"
						name="confsenha"
						onChange={handleChange}
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

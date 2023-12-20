import styles from "@/styles/UserEditForm.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UserEditForm() {
	const [usuarioInfo, setUsuarioInfo] = useState({
		nome: "",
		email: "",
	});

	const [confEmail, setConfEmail] = useState("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (usuarioInfo.email === confEmail) {
			try {
				const response = await fetch("/api/user/updateConta", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(usuarioInfo),
				});

				if (response.ok) {
					// Sucesso na requisição
					console.log("Atualização do usuário concluída");
				} else {
					// Tratar erro na requisição
					console.error("Erro na requisição:", response.statusText);
				}
			} catch (error) {
				console.error("Erro na requisição:");
			}
		}
	}

	function handleCancelar() {
		setUsuarioInfo({
			nome: "",
			email: "",
		});
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioInfo({ ...usuarioInfo, [e.target.name]: e.target.value });
	}

	function handleChangeConfEmail(e: ChangeEvent<HTMLInputElement>) {
		setConfEmail(e.target.value);
	}

	return (
		<>
			<header className={styles.header}>
				<label className={styles.cor_ver + " " + styles.tamanho}>
					Meu Perfil
				</label>
				<br />
				<label className={styles.cor_ver + " " + styles.tamletra}>
					Editar perfil
				</label>
			</header>

			<main>
				<form onSubmit={handleSubmit} className={styles.tamletra}>
					<label htmlFor="name" className={styles.labelform}>
						Nome Completo
					</label>
					<br />
					<input
						onChange={handleChange}
						type="text"
						name="nome"
						id="name"
						className={styles.inputform}
					/>
					<br />

					<label htmlFor="email" className={styles.labelform}>
						E-mail
					</label>
					<br />
					<input
						onChange={handleChange}
						type="email"
						name="email"
						id="email"
						className={styles.inputform}
					/>
					<br />

					<label htmlFor="confemail" className={styles.labelform}>
						Confirmação de e-mail
					</label>
					<br />
					<input
						onChange={handleChangeConfEmail}
						type="email"
						name="confemail"
						id="comfemail"
						className={styles.inputform}
					/>
					<br />

					<label htmlFor="Genero" className={styles.labelform}>
						Gênero
					</label>
					<br />
					<div className={styles.alternativas}>
						<input
							type="radio"
							name="genero"
							id="masculino"
							value="masculino"
							className={styles.check}
						/>
						<label htmlFor="masculino">Masculino</label>
						<input
							type="radio"
							name="genero"
							id="feminino"
							value="feminino"
							className={styles.check}
						/>
						<label htmlFor="feminino">Feminino</label>
						<input
							type="radio"
							name="genero"
							id="outro"
							value="outro"
							className={styles.check}
						/>
						<label htmlFor="outro">Prefiro não informar</label>
						<br />
					</div>

					<label htmlFor="Celular" className={styles.labelform}>
						Celular (DDD + número)
					</label>
					<br />
					<input
						type="number"
						name="telefone"
						id="telefone"
						className={styles.inputform}
					/>
					<br />

					<button
						className={styles.botao2 + " " + styles.button}
						type="submit"
					>
						Salvar Alterações
					</button>
					<button className={styles.button} onClick={handleCancelar}>
						Cancelar
					</button>
				</form>
			</main>
		</>
	);
}

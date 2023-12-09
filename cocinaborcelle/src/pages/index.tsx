import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
import { auth } from "@/../auth/lucia";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{
		userId: string;
		username: string;
		email: string;
	}>
> => {
	const authRequest = auth.handleRequest(context);
	const session = await authRequest.validate();
	if (!session) {
		return {
			redirect: { destination: "/Login", permanent: false },
		};
	}
	return {
		props: {
			userId: session.user.userId,
			username: session.user.username,
			email: session.user.email,
		},
	};
};

export default function index(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const router = useRouter();
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	return (
		<>
			<h1>{props.username}</h1>
			<p>ID: {props.userId}</p>
			<p>Email: {props.email}</p>
			<button
				type="button"
				onClick={async (e) => {
					axios.post("api/logout").then((response) => {
						if (response.status == 200) {
							router.push("/Login");
						}
					});
				}}
			>
				LOG OUT!
			</button>
			<button
				type="button"
				onClick={async (e) => {
					axios.post("api/excluirConta").then((response) => {
						if (response.status == 200) {
							router.push("/Login");
						}
					});
				}}
			>
				Excluir conta
			</button>

			<form>
				<input
					name="nome"
					placeholder="nome"
					onChange={(e) => setNome(e.target.value)}
				></input>
				<input
					name="senha"
					placeholder="senha"
					onChange={(e) => setSenha(e.target.value)}
				></input>
				<button
					type="button"
					onClick={async (e) => {
						axios
							.post("api/updateConta", {
								password: senha,
								username: nome,
							})
							.then((response) => {
								if (response.status == 200) {
									router.reload();
								}
							})
							.catch((e) => {
								console.log(e);
							});
					}}
				>
					Update conta
				</button>
			</form>
		</>
	);
}

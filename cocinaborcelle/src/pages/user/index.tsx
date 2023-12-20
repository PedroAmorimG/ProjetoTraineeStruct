import { useState } from "react";
import { useUser } from "../../../utils/userContext";
import UserEditForm from "@/components/userEditForm";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import getUser from "../../../auth/getUser";
import getCarrinho from "@/clientApi/carrinho/getCarrinho";

export const getServerSideProps = (async (
	context: GetServerSidePropsContext
) => {
	const user = await getUser(context);
	if (user) {
		return { props: user };
	} else {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
}) satisfies GetServerSideProps;

export default function index() {
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const user = useUser();

	return (
		<>
			<h1>{user?.nome}</h1>
			<p>Email: {user?.email}</p>
			<UserEditForm />
		</>
	);
}

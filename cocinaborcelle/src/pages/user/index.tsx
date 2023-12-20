import { useState } from "react";
import { useUser } from "../../../utils/userContext";
import UserEditForm from "@/components/userEditForm";

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

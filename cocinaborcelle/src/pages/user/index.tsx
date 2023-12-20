"useClient";

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../../utils/userContext";
import UserEditForm from "@/components/userEditForm";

export default function index() {
	const router = useRouter();
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const user = useUser();

	return (
		<>
			<h1>{user?.nome}</h1>
			<p>ID: {user?.userId}</p>
			<p>Email: {user?.email}</p>
			<UserEditForm></UserEditForm>
		</>
	);
}

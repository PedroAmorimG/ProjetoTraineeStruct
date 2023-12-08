"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function index() {
	const { data: session } = useSession();
	console.log(session);
	if (session) {
		return (
			<>
				<p>{session.user?.name}</p>
				<button onClick={() => signOut({ redirect: false })}>
					Sign out
				</button>
			</>
		);
	}
	return (
		<>
			<Link href={"Login"}>Login</Link>
			<Link href={"Cadastro"}>Cadastro</Link>
		</>
	);
}

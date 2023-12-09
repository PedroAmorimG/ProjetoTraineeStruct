import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
import { auth } from "@/../auth/lucia";
import axios from "axios";
import { useRouter } from "next/router";

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
		</>
	);
}

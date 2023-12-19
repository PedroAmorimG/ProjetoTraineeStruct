import { GetServerSidePropsContext } from "next";
import { auth } from "./lucia";

export default async function getUser(context: GetServerSidePropsContext) {
	const authRequest = auth.handleRequest(context);
	const session = await authRequest.validate();
	return session?.user;
}

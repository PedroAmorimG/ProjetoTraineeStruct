import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";
import { ReactNode, createContext, useContext } from "react";
import { auth } from "../auth/lucia";
import { User } from "lucia";

const UserContext = createContext<User | null>(null);

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<
	GetServerSidePropsResult<{
		usuario: User;
	}>
> => {
	const authRequest = auth.handleRequest(context);
	const session = await authRequest.validate();
	if (!session) {
		return {
			redirect: { destination: "/login", permanent: false },
		};
	}
	return {
		props: {
			usuario: session.user,
		},
	};
};

function UserProvider(
	{ children }: { children: ReactNode },
	{ usuario }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	return (
		<UserContext.Provider value={usuario}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}

export default UserProvider;

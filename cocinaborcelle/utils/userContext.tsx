import axios from "axios";
import { User } from "lucia";
import { useRouter } from "next/router";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const UserContext = createContext<User | null>(null);
const withoutAuthPages = ["/", "/login", "cadastro"];

export function UserProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [usuario, setUsuario] = useState<null | User>(null);

	useEffect(() => {
		axios
			.get("/api/auth/getUser")
			.then((response) => {
				if (withoutAuthPages.includes(router.pathname)) {
					if (response.data?.user) {
						setUsuario(response.data.user);
					} else {
						setUsuario(null);
					}
				} else {
					if (response.data?.user) {
						setUsuario(response.data.user);
					} else {
						router.replace("/login");
					}
				}
			})
			.catch((e) => {
				router.replace("/cadastro");
			});
	}, [router.pathname]);

	return (
		<UserContext.Provider value={usuario}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}

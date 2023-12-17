import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Galindo } from "next/font/google";
import UserProvider from "../../utils/userContext";

const galindo = Galindo({
	weight: ["400"],
	subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<main className={galindo.className}>
				<Navbar />
				<div className="content_wrapper">
					<Component {...pageProps} />
				</div>

				<Footer />
			</main>
		</UserProvider>
	);
}

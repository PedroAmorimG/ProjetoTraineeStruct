import styles from "@/styles/ButtonLogin.module.css";
import React from "react";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

type ButtonLoginProps = React.PropsWithChildren<{
	type: "button" | "submit";
}>;

export default function ButtonLogin({ type, children }: ButtonLoginProps) {
	return (
		<button
			style={manrope.style}
			type={type}
			className={styles.ButtonLogin}
		>
			{children}
		</button>
	);
}

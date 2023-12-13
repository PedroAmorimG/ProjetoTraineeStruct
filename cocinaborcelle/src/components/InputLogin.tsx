import styles from "@/styles/InputLogin.module.css";
import React from "react";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

type InputLoginProps = React.PropsWithChildren<{
	type: string;
	name: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>;

export default function InputLogin({
	type,
	name,
	placeholder,
	onChange,
	children,
}: InputLoginProps) {
	return (
		<div className={styles.agrupamento_campo}>
			{children}
			<input
				style={manrope.style}
				type={type}
				name={name}
				placeholder={placeholder}
				className={styles.input_esp}
				onChange={onChange}
			></input>
		</div>
	);
}

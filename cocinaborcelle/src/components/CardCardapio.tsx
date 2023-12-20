import styles from "@/styles/CardCardapio.module.css";

import { Manrope } from "next/font/google";
import React from "react";

const manrope = Manrope({ subsets: ["latin"] });

type CardCardapio = React.PropsWithChildren<{
	price: number;
	name: string;
	desc: string;
}>;

export default function CardCardapio({
	price,
	name,
	desc,
	children,
}: CardCardapio) {
	return (
		<div className={styles.grupo} style={manrope.style}>
			<div className={styles.div_sup}>
				<h3 className={styles.name}>{name}</h3>
				<h3 className={styles.price}>R$ {(price / 100).toFixed(2)}</h3>
			</div>
			<div className={styles.div_inf}>
				<p className={styles.desc}>{desc}</p>
				{children}
			</div>
		</div>
	);
}

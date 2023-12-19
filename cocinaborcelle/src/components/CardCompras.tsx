import { useState } from 'react';
import styles from "@/styles/CardCompras.module.css";
import Link from 'next/link';
import {Comida, Compra} from "@prisma/client";

type CardComprasProps = {
    compra: Compra & {comida: Comida}
}

export default function CardCompras({ compra }: CardComprasProps) {
    const [count, setCount] = useState(compra.quantidade)

    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return (
        <section className={styles.cardSection}>
            <div className={styles.CardCompras}>
                <img src="/macarrao.jpg" alt="Macarrão" />
            </div>

            <div className={styles.informacoes}>
                <h4>{'Macarrão'}</h4>
                <p >Lorem ipsum dolor sit amet. Donec vehicula ante risus, in tincidunt libero maximus . </p>
                <div className={styles.priceContainer}>
                    <h5>Preço R$ 00,00</h5>
                    <div className={styles.container}>
                        <button onClick={handleDecrement}>-</button>
                        <span>{count}</span>
                        <button onClick={handleIncrement}>+</button>
                        <div className={styles.buttonContainer}>
                            <button className={styles.counterButtons}>
                                <img src="lixeira.png" height="23" />
                            </button>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.buttonsContainer}>
                                <img src="carrinho.png" alt="Carrinho" height="16" />
                            </button>
                        </div>

                    </div>
                </div>
                

            </div>
        </section>
    )
}

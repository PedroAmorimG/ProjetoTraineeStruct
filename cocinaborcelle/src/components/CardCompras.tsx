
import { useState } from 'react';
import styles from "@/styles/CardCompras.module.css";

type CardComprasProps = {
    title?: string;
    number: number;
}

export default function CardCompras({ title }: CardComprasProps) {
    const [count, setCount] = useState(0);

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
                <img src="/macarrao.jpg" alt="" />
            </div>

            <div className={styles.informacoes}>
                <h1>{title || 'Macarrão'}</h1>
                <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec scelerisque diam. Donec vehicula ante risus, in tincidunt libero maximus suscipit. </p>
                <div className={styles.priceContainer}>
                    <h2>Preço R$ 00,00</h2>
                    <div className={styles.container}>
                        <button onClick={handleDecrement}>-</button>
                        <span>{count}</span>
                        <button onClick={handleIncrement}>+</button>
                        <button className={styles.counterButtons} >Excluir</button>
                        <div className={styles.buttonsContainer}>
                </div>
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.buttonsContainer}>Finalizar Pedido</button>
                </div>
            </div>
        </section>
    )
}

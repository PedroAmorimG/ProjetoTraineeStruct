import { useState } from 'react';
import styles from "@/styles/CardComida.module.css";

type CardComidaProps = {
    title?: string;
}

export default function CardComida({ title }: CardComidaProps) {
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
        <div className={styles.CardComida}>
            <img src="macarrao.jpg" alt={title} />
            <h1>{title}</h1>
            <h2>Descrição</h2>
            <h2>Preço R$ 00,00 <button onClick={handleDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button></h2>
            
            
        </div>

    );
}

import style from "@/styles/Navbar.module.css"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

    const [hamburguer, setHamburguer] = useState(false)

    const clique = () => {
        setHamburguer(!hamburguer)
        console.log(hamburguer)
    }
    
    return (
        <>
            
            <nav className={`${style.navbar} ${hamburguer ? style.active : ""}`} >
                <span className={style.toggle_title}><h2>COCINA BORCELLE</h2></span>
                <a href="#" onClick={clique} className={style.toggle_button}>
                    <span className={style.bar}></span>
                    <span className={style.bar}></span>
                    <span className={style.bar}></span>
                </a>

                <div className={`${style.navbar_links} ${hamburguer ? style.active : ""}`} >
                    <ul>
                        <li><Link href="">CARDÁPIO</Link></li>
                        <li><Link href="">UNIDADES</Link></li>
                        <li><Link href="/"><img className={style.logo} src="/logo.png" alt="" /></Link></li>
                        <li><Link href="">DELIVERY</Link></li>
                        <li><Link href="">CONTATO</Link></li>

                        <li><Link href=''><img src="/userwhite.png" alt="" /></Link></li>
                        <li ><Link href=''><img src="/carrinhowhite.png" alt="" /></Link>  </li>    
        
                    </ul>
                </div>
            </nav>

        </>
    )
}
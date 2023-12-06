import style from "@/styles/Footer.module.css"
import Link from "next/link"

export default function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <div className={style.footer_content}>
                    <li className={style.center}><p><Link href="">LOCALIZAÇÃO  </Link> <br/><Link href="">CONTATO</Link></p></li>
                    <li>
                        <p> <img className={style.img_info} src="phone.png" alt="" /> (61) 0000-0000 <br/></p>
                        <p> <img className={style.img_info} src="email.png" alt="" /> coci@email.com </p>
                    </li>
                    <li><img className={style.logo} src="/logo.png" alt="" /></li>
                    <li className={style.center}><p>HÓRARIOS DE ATENDIMENTO: <br/>SEG - SEX: 12H - 21H <br/> SAB - DOM: 11H - 22H </p></li>
                    <li>
                        <Link href='/'>
                            <img src="/facebook.png" alt="" />
                        </Link>
                       
                    </li>

                    <li>
                        <Link href='/'>
                            <img src="/instagram.png" alt="" />
                        </Link>
                    </li>

                </div>
            </footer>            
        </>
    )
}
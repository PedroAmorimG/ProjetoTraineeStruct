import style from '@/styles/Home.module.css'
import Slides from "@/pages/slides"
import React from 'react'

export default function Home() {
  return (
    <>
      <section className={style.banner}>
        <div className={style.banner_content}>
          <h2>A melhor cozinha te espera!</h2>
        </div>
        
      </section>

      <section className={style.info}>
        <div className={style.info_content}>
          <div>
            <h4>SOMOS A CUCINA BORCELLE</h4>
            <p>Uma casa de massas italiana com uma diversidade de pratos e um sabor inesquecível.
            Venha degustar o NOSSO menu EXCLUSIVO.</p>
          </div>
        </div>

        <div>
          <img src="/espaguete.png" alt="" />
        </div>

        <div>
          <img src="/pizza.png" alt="" />
        </div>
      </section>

      <section className={style.imgs_options}> 
          <img src="/pasta.png" alt="" />
          <img src="/pizza2.png" alt="" />
          <img src="/macarrao.png" alt="" />
      </section>
      
      <Slides/>
    </>
  )
}
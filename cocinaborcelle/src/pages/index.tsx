import style from '@/styles/Home.module.css'
import { symlink } from 'fs'

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

      <section className={style.feedback}>
        <h2>SUGESTÃO DE CLIENTES</h2>
        <div className={style.feedback_content}>
          
          <div className={style.feedback_card}>
              <h3>CLIENTE</h3>
              <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>

          <div className={style.feedback_card}>
              <h3>CLIENTE</h3>
              <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>

          <div className={style.feedback_card}>
              <h3>CLIENTE</h3>
              <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur...”</p>
          </div>
        </div>
  
      </section>
    </>
  )
}

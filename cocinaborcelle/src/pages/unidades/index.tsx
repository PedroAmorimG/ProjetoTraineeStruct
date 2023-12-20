import Head from 'next/head'
import style from '@/styles/pagina-restaurante.module.css'
import getRestaurante from '@/clientApi/restaurantes/getRestaurante'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps = (async () => {
    const restaurante = await getRestaurante({id: 1})


    return { props: {restaurante} }
}) satisfies GetServerSideProps

export default function PaginaRestaurante(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Head>
                <title>Unidades {props.restaurante.localizacao.map((item) => (item.cidade))}
                </title>
            </Head>
        

            <main>
                <div className={style.banner}>
                    <div className={style.banner_content}>
                        <h2>{props.restaurante.nome}</h2>
                        {props.restaurante.localizacao.map((item) => (
                            <p>
                                {item.cidade} | {item.rua}
                            </p>
                        ))}
                    </div>
                </div>

                <div className={style.description}>
                    <div className={style.description_content}>
            
                        <h3 className={style.titulo}>Boas vindas a Cuconoa Borcelle</h3>
                        <p>{props.restaurante.descricao}. </p>
                    
                    </div>

                    <div className={style.description_content}>
                        <h3 className={style.titulo}>Cardápio</h3>
                        <p> O nosso cardapio possui várias opções da gastronomia italiana.
                            Todos nossos chefs possuem um pezinho na italia venhar conhecer nosso cardapio clicando no butão em baixo </p>
                        <button className={style.button}>Nosso Cardápio</button>
                    </div>

                </div>

                <div className={style.unity}>
                    <h3 className={style.titulo}>Unidade De {props.restaurante.localizacao.map((item)=> (item.cidade))}</h3>
                    <div className={style.unity_content}>
                        <div>
                            <p>
                                Cucona Borcelle Brasilia possui belíssima e moderna arquitetura,
                                com capacidade para até 560 pessoas divididas em dois pavimentos.
                                Seu principal diferencial é o cardápio especializado em frutos do mar,
                                sua adega climatizada com mais de 2000 mil garrafas, jardim vertical
                                e ambientes para eventos totalmente climatizados e com isolamento
                                acústico, projetores e telões. Está instalado no DF Plaza, novo complexo
                                com excelente estrutura na região.
                                sac.aguasclaras@cocobambu.com
                            </p>

                            <div className={style.date}>
                                <h4>Horarios de Funcionamento</h4>
                                <ul>
                                    <li><h5>Todos os Dias</h5> <p>11H30 AS 00H</p> </li>
                                    <li><h5>Happy Hour</h5> <p>17H00 AS 20H</p> </li>
                                    <li><h5>Telefone</h5> <p>(61) 3999-1149</p> </li>
                                
                                </ul>
                            </div>
                        </div>

                        <div>
                            <img src="/banner2.png" alt="" />
                        </div>
                    </div>

                    

                    

                </div>
            </main>
        </>
    )
}
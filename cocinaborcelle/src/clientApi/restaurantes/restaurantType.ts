import { Localizacao, RedeSocial, Restaurante } from "@prisma/client"

type RestauranteType = {
    redesocial: RedeSocial,
    localizacao: Localizacao[]
} & Restaurante

export default RestauranteType
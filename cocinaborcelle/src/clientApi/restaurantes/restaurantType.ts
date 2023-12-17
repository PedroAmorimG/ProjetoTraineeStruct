import { Localizacao, RedeSocial, Restaurante } from "@prisma/client"

type RestauranteType = {
    restaurante: Restaurante,
    redesocial: RedeSocial,
    localizacao: Localizacao,
}

export default RestauranteType
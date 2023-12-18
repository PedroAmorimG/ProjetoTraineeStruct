import RestauranteType from "./restaurantType"
import api from "../api"

type RestauranteIdentifier = {
    id: Number,
}


async function getRestaurante(RestauranteIdentifier: RestauranteIdentifier): Promise<RestauranteType>{
    const { data } = await api.get("/restaurante/show", {data: RestauranteIdentifier})
    return data
}

export default getRestaurante
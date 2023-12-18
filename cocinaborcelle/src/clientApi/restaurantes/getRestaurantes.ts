import RestauranteType from "./restaurantType"
import  api  from "../api"

async function getRestaurantes(): Promise<RestauranteType[]>{
    const {data} = await api.get("/restaurante/index")
    
    return data
}

export default getRestaurantes
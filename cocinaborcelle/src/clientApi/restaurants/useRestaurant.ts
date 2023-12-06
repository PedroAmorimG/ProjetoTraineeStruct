import { axios } from "axios"
import { useEffect, useState } from "react"


export default function useRestaurant( {restaurantSlug} ) {

    const [data,setData] = useState()

    useEffect(() =>{
        axios.get(`/api/restaurant/${restaurantSlug}`)
        .then( ( { data } ) =>{
            setData( data )
        } )
    })

    return data
}
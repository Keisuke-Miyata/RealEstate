import React, { useEffect, useState } from "react"
import {listData} from "../lib/data"
import { useParams } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"

const ItemDetail = () => {

    const {id} = useParams();
    const[post, setPost] = useState(null);
    const[loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = () => {
            const item = listData.find((item) => parseInt(item.id, 10) === parseInt(id, 10))
            if(item){
                setPost(item)
            } else {
                console.error("Place is not found");
            }
            setLoading(false);
        };
        fetchData();
    }, [id])

    if(loading){
        <div>Loading...</div>
    }

    if(!item) {
        return <div>Place not found</div>
    }

    return (
        <div>
            <h1>{item.type}</h1>
            <ImageCarousel images={item.images} />
            
        </div>
    )
}

export default ItemDetail
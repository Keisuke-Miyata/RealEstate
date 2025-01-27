import React, { useEffect, useState } from "react"
import {listData} from "../lib/data"
import { useParams } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import FeatureDetail from "../components/FeatureDetail"

const PlaceDetail = () => {

    const {id} = useParams();
    const[post, setPost] = useState(null);
    const[loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = () => {
            const place = listData.find((item) => parseInt(item.id, 10) === parseInt(id, 10))
            if(place){
                setPost(place)
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

    if(!post) {
        return <div>Place not found</div>
    }

    return (
        <div className="m-16 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48 xl:ml-96 xl:mr-96">
            <ImageCarousel images={post.images} />
            <FeatureDetail post={post} />
        </div>
    )
}

export default PlaceDetail
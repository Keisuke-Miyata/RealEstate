import React, { useEffect, useState } from "react"
import { listSeeker } from "../lib/data"
import { useParams } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import SeekerDetails from "../components/SeekerDetails"

const Seeker = () => {

    const {id} = useParams();
    const[post, setPost] = useState(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = () => {
            const seeker = listSeeker.find((item) => parseInt(item.id, 10) === parseInt(id, 10))
            if(seeker){
                setPost(seeker)
            }else {
                console.log("Seeker's post is not found")
            }
            setLoading(false)
        }
        fetchData();
    }, [id])

    if(loading){
        <div>Loading...</div>
    }

    if(!post) {
        return <div>Seeker's post not found</div>
    }

    return (
        <div className="m-16">
            <ImageCarousel images={post.images} />
            <SeekerDetails post={post} />
        </div>
    )
}

export default Seeker
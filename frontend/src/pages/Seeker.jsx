import React, { useEffect, useState } from "react"
import { listSeeker } from "../lib/data"
import { useParams } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import SeekerDetails from "../components/SeekerDetails"
import { useQuery } from "react-query";
import { getTenant } from "../utils/api"
import { PuffLoader } from "react-spinners"

const Seeker = () => {

    const {id} = useParams();
    const[post, setPost] = useState(null)
    const[loading, setLoading] = useState(true)

    const { data, isError, isLoading } = useQuery(
        "tenant",
        () => getTenant(id),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    )

    if(isLoading){
        return (
            <div className="h-64 flexCenter">
                <PuffLoader
                    height="80"
                    width="80"
                    radius={1}
                    color="#555"
                    aria-label="puff-loading"
                />
            </div>
        )
    }

    if(isError) {
        return <div>Error while fething tenant data</div>
    }

    return (
        <div className="m-16">
            <ImageCarousel images={data.image} />
            <SeekerDetails post={data} />
        </div>
    )
}

export default Seeker
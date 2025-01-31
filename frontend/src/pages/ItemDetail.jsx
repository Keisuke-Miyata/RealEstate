import React, { useEffect, useState } from "react"
// import {listData} from "../lib/data"
import { useParams } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import { PuffLoader } from "react-spinners";
import { getItem } from "../utils/api";
import { useQuery } from "react-query";
import ItemFeatureDetail from "../components/ItemFeatureDetail";


const ItemDetail = () => {

    const { id } = useParams();

    const { data: post, isError, isLoading } = useQuery(
        ["item", id],
        () => getItem(id), // Fetch the property by ID
        {
            retry: false, // Prevent retrying on failure (optional)
            refetchOnWindowFocus: false, // Prevent refetching on tab focus (optional)
        }
    );

    if (isLoading) {
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
        );
    }

    if (isError) {
        return (
            <div>
                <span>Error while fetching property details</span>
            </div>
        );
    }

    if (!post) {
        return <div>Place not found</div>;
    }

    return (
        <div className="m-16 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48 xl:ml-96 xl:mr-96">
            <h1>{post.type}</h1>
            <ImageCarousel images={post.image} />
            <ItemFeatureDetail post={post}/>
        </div>
    )
}

export default ItemDetail
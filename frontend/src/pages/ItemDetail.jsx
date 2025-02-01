import React, { useEffect, useState } from "react"
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
            <div className="puffloader">
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
                <span>Error while fetching item details</span>
            </div>
        );
    }

    if (!post) {
        return <div>Item not found</div>;
    }

    return (
        <div className="card-detail">
            <h1>{post.type}</h1>
            <ImageCarousel images={post.image} />
            <ItemFeatureDetail post={post}/>
        </div>
    )
}

export default ItemDetail
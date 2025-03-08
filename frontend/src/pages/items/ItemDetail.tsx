import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../../components/media/ImageCarousel";
import { PuffLoader } from "react-spinners";
import { getItem } from "../../utils/api";
import { useQuery } from "react-query";
import ItemInfo from "../../components/item/ItemInfo";

interface ItemDetailParams {
    id: string;
}

interface Post {
    createdAt: string;
    title: string;
    price: number;
    condition: string;
    address: string;
    description: string;
    image: string[];
    type: string;
}

const ItemDetail: FC = () => {
    const { id } = useParams();

    const { data: post, isError, isLoading } = useQuery<Post | undefined, Error>(
        ["item", id],
        () => getItem(id as string),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return (
            <div className="puffloader">
                <PuffLoader
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
            <ItemInfo post={post}/>
        </div>
    );
}

export default ItemDetail;
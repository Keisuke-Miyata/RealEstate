import React, { FC } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../../components/media/ImageCarousel";
import PropertyInfo from "../../components/property/PropertyInfo";
import { PuffLoader } from "react-spinners";
import { getProperty } from "../../utils/api";
import { useQuery } from "react-query";
import {PropertyDetails} from "../../shared/types"

interface Params {
    id: string;
}


const PropertyDetail: FC = () => {
    const { id }= useParams<{ id: string }>();

    const { data: post, isError, isLoading }: { data: PropertyDetails | undefined; isError: boolean; isLoading: boolean; } = useQuery(
        ["property", id],
        () => getProperty(id as string),
        {
            enabled: !!id,
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
                <span>Error while fetching property details</span>
            </div>
        );
    }

    if (!post) {
        return <div>Place not found</div>;
    }

    return (
        <div className="card-detail">
            <ImageCarousel images={post.image} />
            <PropertyInfo post={post} />
        </div>
    );
};

export default PropertyDetail;
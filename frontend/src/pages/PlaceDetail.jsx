import React from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import FeatureDetail from "../components/FeatureDetail";
import { PuffLoader } from "react-spinners";
import { getProperty } from "../utils/api";
import { useQuery } from "react-query";

const PlaceDetail = () => {
    const { id } = useParams();

    // Use `useQuery` to fetch data
    const { data: post, isError, isLoading } = useQuery(
        ["property", id],
        () => getProperty(id), // Fetch the property by ID
        {
            retry: false, // Prevent retrying on failure (optional)
            refetchOnWindowFocus: false, // Prevent refetching on tab focus (optional)
        }
    );

    // Show loading spinner
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

    // Show error message
    if (isError) {
        return (
            <div>
                <span>Error while fetching property details</span>
            </div>
        );
    }

    // Handle missing property
    if (!post) {
        return <div>Place not found</div>;
    }

    // Render the property details
    return (
        <div className="card-detail">
            <ImageCarousel images={post.image} />
            <FeatureDetail post={post} />
        </div>
    );
};

export default PlaceDetail;

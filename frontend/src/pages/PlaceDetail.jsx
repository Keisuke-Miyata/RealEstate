// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import ImageCarousel from "../components/ImageCarousel"
// import FeatureDetail from "../components/FeatureDetail"
// import { PuffLoader } from "react-spinners"
// import { getProperty } from "../utils/api"
// import { useQuery } from "react-query"

// const PlaceDetail = () => {

//     const {id} = useParams();
//     const[post, setPost] = useState(null);
//     const[loading, setLoading] = useState(true)

//     const { data, isError, isLoading } = useQuery(["resd", id], () => getProperty(id))

//     useEffect(()=> {
//         const fetchData = () => {
//             const place = data.find((item) => parseInt(item.id, 10) === parseInt(id, 10))
//             if(place){
//                 setPost(place)
//             } else {
//                 console.error("Place is not found");
//             }
//             setLoading(false);
//         };
//         fetchData();
//     }, [id])

//     if(loading){
//         return (
//             <div className="h-64 flexCenter">
//                 <PuffLoader
//                     height="80"
//                     width="80"
//                     radius={1}
//                     color="#555"
//                     aria-label="puff-loading"
//                 />
//             </div>
//         )
//     }

//     if (isError){
//         return (
//             <div>
//                 <span>Error while fetching property details</span>
//             </div>
//         )
//     }

//     if(!post) {
//         return <div>Place not found</div>
//     }

//     return (
//         <div className="m-16 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48 xl:ml-96 xl:mr-96">
//             <ImageCarousel images={post.image} />
//             <FeatureDetail post={post} />
//         </div>
//     )
// }

// export default PlaceDetail


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
        <div className="m-16 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48 xl:ml-96 xl:mr-96">
            <ImageCarousel images={post.image} />
            <FeatureDetail post={post} />
        </div>
    );
};

export default PlaceDetail;

import React from "react"
import Map from "./Map"

const ItemFeatureDetail = ({ post }) => {
    return (
        <div className="mt-20 bg-gray-300 pl-10 pr-10 pt-10 pb-10">
            <h2>{post.title}</h2>
            <h3>{post.condition}</h3>
            <hr />

            <div className="flex items-center p-4">
                <div className="bg-orange-300 p-4">
                    <h3>{post.address}</h3>
                </div>
            </div>
            <hr/>
            <h2 className="text-[20px]">About the Item</h2>
            <p>
                {post.description}
            </p>
            <hr />

            <section>
                <div>
                    <h2 className="text-[20px]">Room Overview</h2>
                    <p>HUF {post.price} monthly rent</p>
                    <p>HUF {post.bond} bond</p>
                    <p>Private room</p>
                    <p>Minimun {post.min} stay</p>
                    <p>Available {post.dateAvailability}</p>
                    <p>{post.furnish}</p>
                    <p>Anyone including couples</p>
                </div>
                <div>
                    <h2 className="text-[20px]">Features</h2>
                </div>
            </section>
            <section>
                <Map address={post.address}/>
            </section>
        </div>

    )
}

export default ItemFeatureDetail

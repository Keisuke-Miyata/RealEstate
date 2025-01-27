import React from "react"
import { FaBed, FaShower, FaHouseUser, FaCheck } from "react-icons/fa"
import Map from "./Map"

const FeatureDetail = ({ post }) => {
    return (
        <div className="mt-20 bg-gray-300 pl-10 pr-10 pt-10 pb-10">
            <h2>{post.address}</h2>
            <h2>{post.type} for rent</h2>
            <hr />

            <div className="flex items-center p-4">
                <div className="bg-orange-300 p-4">
                    <h4>HUF {post.rent} / m</h4>
                    <h5>{post.bills ? "with" : "without"} bills</h5>
                </div>
                <ul className='flex gap-6 pl-5'>
                    <li className="flex items-center gap-1"><FaBed /> {post.bedroom}</li>
                    <li className="flex items-center gap-1"><FaShower /> {post.bathroom}</li>
                    <li className="flex items-center gap-1"><FaHouseUser /> {post.bedroom}</li>
                </ul>
            </div>
            <hr/>
            <h2 className="text-[20px]">About the property</h2>
            <p>
                {post.discription}
            </p>
            <h4>Property accepting of</h4>
            <ul className="flex flex-wrap gap-2 mt-5 mb-5">
                {post.accepting.map((item, index) => (
                    <li key={index} className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-1">
                        <FaCheck />
                        {item}
                    </li>
                ))}
            </ul>
            <hr />

            <section>
                <div>
                    <h2 className="text-[20px]">Room Overview</h2>
                    <p>HUF {post.rent} monthly rent</p>
                    <p>HUF {post.bond} bond</p>
                    <p>Private room</p>
                    <p>Minimun {post.min} stay</p>
                    <p>Available {post.date_start}</p>
                    <p>{post.furnished ? "Furnished" : "Unfurnished"}</p>
                    <p>Anyone including couples</p>
                </div>
                <div>
                    <h2 className="text-[20px]">Features</h2>
                    <ul>
                        {post.overview.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section>
                <Map address={post.address}/>
            </section>
        </div>
    )
}

export default FeatureDetail
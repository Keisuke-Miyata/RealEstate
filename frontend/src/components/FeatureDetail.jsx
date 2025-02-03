import React from "react";
import { FaBed, FaShower, FaHouseUser, FaCheck } from "react-icons/fa";
import Map from "./Map";

const FeatureDetail = ({ post }) => {
    const dateOnly = post.dateAvailability.split("T")[0];

    return (
        <div className="bg-white shadow-xl rounded-lg mt-20 p-8 mx-auto max-w-4xl">
            {/* Address and Type Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{post.address}</h2>
                <h3 className="text-xl text-gray-600">{post.type} for rent</h3>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Rent, Bills, and Property Details Section */}
            <div className="flex items-center justify-between bg-orange-100 p-6 rounded-lg shadow-md mb-8">
                <div>
                    <h4 className="text-xl font-semibold text-gray-800">HUF {post.rent} / m</h4>
                    <h5 className="text-gray-700">{post.bills ? "With" : "Without"} bills</h5>
                </div>
                <ul className="flex gap-6 pl-5">
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaBed /> {post.room} Room
                    </li>
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaShower /> {post.room} Shower
                    </li>
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaHouseUser /> {post.room} House
                    </li>
                </ul>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Property Description Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">About the Property</h2>
                <p className="text-gray-700 mt-2">{post.description}</p>
            </div>

            {/* Property Accepting Section */}
            <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800">Property Accepting</h4>
                <ul className="flex flex-wrap gap-2 mt-5">
                    {post.accepting.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-1 rounded-full bg-gray-500 text-white px-3 py-1"
                        >
                            <FaCheck />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Room Overview Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Room Overview</h2>
                <p className="text-gray-700">HUF {post.rent} monthly rent</p>
                <p className="text-gray-700">HUF {post.bond} bond</p>
                <p className="text-gray-700">Private room</p>
                <p className="text-gray-700">Minimum stay: {post.min} months</p>
                <p className="text-gray-700">Available: {dateOnly}</p>
                <p className="text-gray-700">{post.furnish}</p>
                <p className="text-gray-700">Anyone, including couples</p>
            </section>

            {/* Features Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Features</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    {post.overview.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>

            {/* Map Section */}
            <section className="mb-8">
                <Map address={post.address} />
            </section>
        </div>
    );
};

export default FeatureDetail;

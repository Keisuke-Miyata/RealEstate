import React from "react";
import { FaBed, FaShower, FaHouseUser, FaCheck, FaMoneyBill } from "react-icons/fa";
import Map from "./Map";
import { TbMeterSquare } from "react-icons/tb";
import { LuClock4 } from "react-icons/lu";
import { FaTruck } from "react-icons/fa6";



const FeatureDetail = ({ post }) => {
    const dateOnly = post.dateAvailability.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    const moveDate = dateOnly < today ? "Now" : dateOnly;

    return (
        <div className="bg-white shadow-xl rounded-lg mt-20 p-8 mx-auto max-w-4xl">
            {/* Address and Type Section */}
            <div className="mb-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-3">{post.title}</h1>
    <h2 className="text-2xl font-semibold text-gray-800">{post.address}</h2>
    <h3 className="text-lg text-gray-600 italic">{post.type} for rent</h3>
    <div className="flex items-center gap-2 text-lg font-medium text-gray-700 mt-2">
        <span className="justify-left">{post.size} sqm</span>
    </div>
</div>


            <hr className="border-gray-200 mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {/* Monthly Budget */}
                <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
                    <FaMoneyBill size={30} className="text-blue-500" />
                    <div className="text-center">
                        <p className="font-bold text-gray-800">{post.rent} / month</p>
                        <p className="text-sm text-gray-500">Monthly rent</p>
                    </div>
                </div>

                {/* Stay Length */}
                <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
                    <LuClock4 size={30} className="text-orange-500" />
                    <div className="text-center">
                        <p className="font-bold text-gray-800">{post.max}</p>
                        <p className="text-sm text-gray-500">Expected stay length</p>
                    </div>
                </div>

                {/* Move Date */}
                <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
                    <FaTruck size={30} className="text-green-500" />
                    <div className="text-center">
                        <p className="font-bold text-gray-800">{moveDate}</p>
                        <p className="text-sm text-gray-500">Move date</p>
                    </div>
                </div>
            </div>

            {/* Rent, Bills, and Property Details Section */}
            <div className="flex items-center justify-between bg-orange-100 p-6 rounded-lg shadow-md mb-8">
                <div>
                    <h5 className="text-gray-700">{post.billsIncluded ? "With" : "Without"} bills</h5>
                </div>
                <ul className="flex gap-6 pl-5">
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaBed /> {post.room} Room
                    </li>
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaShower /> {post.bathroom} Shower
                    </li>
                    <li className="flex items-center gap-1 text-gray-700">
                        <FaHouseUser /> {post.tenants} House
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
                <p className="text-gray-700">Available from: {dateOnly}</p>
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

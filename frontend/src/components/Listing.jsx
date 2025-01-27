import React, { useEffect, useState } from "react";
import { listData, listSeeker } from "../lib/data.js";
import { FaBed, FaShower, FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Item from "../components/Item"

const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const Listing = () => {
    const [randomItems, setRandomItems] = useState([]);

    useEffect(() => {
        // Merge listData and listSeeker, shuffle, and pick random items
        const combinedList = [
            ...listData.map((item) => ({ ...item, type: "place" })),
            ...listSeeker.map((item) => ({ ...item, type: "seeker" })),
        ];
        setRandomItems(getRandomItems(combinedList, 6)); // Select 6 random items
    }, []);

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center">
                {randomItems.map((item) =>
                    item.type === "place" ? (
                        // Render places
                        <div
                            key={item.id}
                            className="p-4 bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <Link to={`/place/${item.id}`}>
                                <img
                                    src={item.images[0]}
                                    alt="Listing"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="mt-2 flex items-center gap-4 text-gray-800">
                                    HUF {item.rent} / month
                                    <span>{item.bills ? "Inc." : "Exc."} bills</span>
                                </div>
                                <div className="text-gray-700">{item.address}</div>
                                <ul className="flex gap-4 mt-2 text-gray-600">
                                    <li className="flex items-center gap-1">
                                        <FaBed /> {item.bedroom}
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <FaShower /> {item.bathroom}
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <FaHouseUser /> {item.bedroom}
                                    </li>
                                    <li>{item.type} in Flatshare</li>
                                </ul>
                                <div className="text-sm text-gray-500">Available from {item.date_start}</div>
                            </Link>
                        </div>
                    ) : (
                        // Render seekers
                        <div
                            key={item.id}
                            className="p-4 bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <Link to={`/seeker/${item.id}`}>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.images[0]}
                                        alt="Seeker"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Age: {item.age}</p>
                                        <p className="text-sm text-gray-500">
                                            Budget: HUF {item.budget}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700">{item.introduction}</p>
                                <ul className="mt-2 text-sm text-gray-600">
                                    {item.details.map((detail, index) => (
                                        <li key={index}>- {detail}</li>
                                    ))}
                                </ul>
                            </Link>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Listing;

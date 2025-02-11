import React, { useState, useRef, useEffect } from "react";
import { useSharecontext } from "../context/ShareProvider"
import { FaBed, FaShower, FaHouseUser } from "react-icons/fa";


const SavedList = () => {
    const { favorites, favoriteItems } = useSharecontext();

    const [cards] = useState(favoriteItems)

    const scrollRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[300px]">
            {favoriteItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <h2 className="text-2xl font-semibold">No saved items yet</h2>
                    <p className="mt-2">Start adding your favorite properties, tenants, or items.</p>
                </div>
            ) : (
                <div
                    ref={scrollRef}
                    className="overflow-x-scroll scrollbar-hide relative px-0.5 w-full"
                    style={{ overflowY: "hidden", cursor: "grab" }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeaveOrUp}
                    onMouseUp={handleMouseLeaveOrUp}
                    onMouseMove={handleMouseMove}
                >

                    <div className="flex snap-x snap-mandatory gap-4 border border-gray-300 rounded-md w-max h-[340px]">
                        {favoriteItems.map((card) => (
                            <div key={card.id} className="flex-none w-64 snap-center">
                                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                    <img src={card.image} alt="" className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-md leading-6 font-bold text-gray-900">{card.title}</h3>

                                        {/* Property Details */}
                                        {"accommodationType" in card && (
                                            <div className="mt-2 text-sm text-gray-700">
                                                <ul className="flex gap-4 mt-2 text-gray-600">
                                                    <li className="flex items-center gap-1">
                                                        <FaBed /> {card.room}
                                                    </li>
                                                    <li className="flex items-center gap-1">
                                                        <FaShower /> {card.bathroom}
                                                    </li>
                                                    <li className="flex items-center gap-1">
                                                        <FaHouseUser /> {card.tenants}
                                                    </li>
                                                    <li>{card.type} in Flatshare</li>
                                                </ul>
                                                <p><strong>Address:</strong> {card.address}</p>
                                            </div>
                                        )}

                                        {/* Tenant Details */}
                                        {"fieldOfStudy" in card && (
                                            <div className="mt-2 text-sm text-gray-700">
                                                <p><strong>Name:</strong> {card.name}</p>
                                                <p><strong>Gender:</strong> {card.gender}</p>
                                                <p><strong>Field of Study:</strong> {card.fieldOfStudy}</p>
                                                <p><strong>Max Flatmates:</strong> {card.maxFlatmates}</p>
                                            </div>
                                        )}

                                        {/* Item Details */}
                                        {"condition" in card && (
                                            <div className="mt-2 text-sm text-gray-700">
                                                <p><strong>Condition:</strong> {card.condition}</p>
                                                <p><strong>Location:</strong> {card.address}</p>
                                            </div>
                                        )}

                                        {/* Price (Always Shown) */}
                                        <p className="text-gray-600 mt-2 text-sm text-overflow">{card.description ?? card.introduction}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="price">
                                                HUF {card.price ?? card.monthlyBudget ?? card.rent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default SavedList;

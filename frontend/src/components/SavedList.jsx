import React, { useState, useRef, useEffect } from "react";
import { useSharecontext } from "../context/ShareProvider"


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
                <div className="flex snap-x snap-mandatory gap-4 border border-gray-300 rounded-md w-max">
                    {favoriteItems.map((card) => (
                        <div key={card.id} className="flex-none w-64 snap-center">
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                                <img src={card.image} alt="" className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-2xl font-extrabold text-gray-900">HUF {card.price ?? card.monthlyBudget ?? card.rent}</span>
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

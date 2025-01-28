import React, { useEffect, useState } from "react";
import { listData, listSeeker } from "../lib/data.js";
import { FaBed, FaShower, FaHouseUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import useRandomItems from "../hooks/useDataUtils.js";
import { PuffLoader } from "react-spinners";
import Item from "./Item"
import TenantItem from "./TenantItem.jsx";


const Listing = () => {
    const { randomItems, isLoading, isError } = useRandomItems()

    if (isError) {
        return (
            <div>
                <span>Error while fetching data.</span>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div>
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


    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center">
                {randomItems.map((item) =>
                    item.category === "property" ? (
                        // Render places
                        <div
                            key={item.id}
                            className=" bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <Item key={item.title} property={item} />
                        </div>
                    ) : (
                        // Render seekers
                        <div
                            key={item.id}
                            className=" bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <TenantItem key={item.title} tenant={item} />
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Listing;

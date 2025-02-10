import React, { useEffect, useState } from "react";
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


    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center pb-10">
                {randomItems.map((item) =>
                    item.category === "property" ? (
                            <Item key={item.title} property={item} />
                    ) : (
                            <TenantItem key={item.title} tenant={item} />
                    )
                )}
            </div>
        </section>
    );
};

export default Listing;

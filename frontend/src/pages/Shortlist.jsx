import React, { useEffect, useState } from "react"
import { getProperty, getTenant, getItem } from "../utils/api"
import { useSharecontext } from "../context/ShareProvider"
import Item from "../components/Item"
import TenantItem from "../components/TenantItem"
import SellItem from "../components/SellItem"

const Shortlist = () => {

    const { favorites, favoriteItems } = useSharecontext();

    return (
        <section className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center mt-28">
                {favoriteItems.map((item) => (
                    <div key={item.id}>
                        {item.category === "place" && <Item key={item.id} property={item} />}
                        {item.category === "seeker" && <TenantItem key={item.id} tenant={item} />}
                        {item.category === "items" && <SellItem key={item.id} item={item} />}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Shortlist
import React from "react";
import { useSharecontext } from "../context/ShareProvider";
import Item from "../components/Item";
import TenantItem from "../components/TenantItem";
import SellItem from "../components/SellItem";

const Shortlist = () => {
    const { favoriteItems } = useSharecontext();

    return (
        <section className="max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
            {favoriteItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-28">
                    <h2 className="text-2xl font-semibold">No favorite items yet</h2>
                    <p className="mt-2">Browse and add properties, tenants, or items to your favorites.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
                    {favoriteItems.map((item) => (
                        <div key={item.id}>
                            {item.category === "place" && <Item property={item} />}
                            {item.category === "seeker" && <TenantItem tenant={item} />}
                            {item.category === "items" && <SellItem item={item} />}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Shortlist;

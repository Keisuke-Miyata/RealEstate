import React from "react";
import { useSharecontext } from "../context/ShareProvider";
import Item from "../components/property/PropertyItem";
import TenantItem from "../components/tenant/TenantItem";
import SellItem from "../components/item/SellItem";

const Shortlist = () => {
    const { favoriteItems } = useSharecontext();
    return (
        <section className="max-w-[1440px] mx-auto min-h-screen">
            {favoriteItems.length === 0 ? (
                <div className="flex items-center justify-center">
                    <div className="text-center text-gray-500 mt-[400px]">
                        <h2 className="text-2xl font-semibold">No favorite items yet</h2>
                        <p className="mt-2">Browse and add properties, tenants, or items to your favorites.</p>
                    </div>
                </div>
            ) : (
                <div className="card-container mt-28">
                    {favoriteItems.map((item) => (
                        <div key={item.id}>
                            {item.category === "property" && <Item property={item} />}
                            {item.category === "tenant" && <TenantItem tenant={item} />}
                            {item.category === "item" && <SellItem item={item} />}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Shortlist;
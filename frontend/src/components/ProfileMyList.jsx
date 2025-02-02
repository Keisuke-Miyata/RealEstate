// import { useEffect, useState } from "react";
// import { getUserProperty, getUserTenant, getUserItem } from "../utils/api";
// import Item from "./Item";
// import TenantItem from "./TenantItem";
// import SellItem from "./SellItem";

// const UserItemsList = ({ userEmail }) => {
//     const [properties, setProperties] = useState([]);
//     const [tenants, setTenants] = useState([]);
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [propertyData, tenantData, itemData] = await Promise.all([
//                     getUserProperty(userEmail),
//                     getUserTenant(userEmail),
//                     getUserItem(userEmail),
//                 ]);

//                 setProperties(propertyData);
//                 setTenants(tenantData);
//                 setItems(itemData);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userEmail) {
//             fetchData();
//         }
//     }, [userEmail]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">Error: {error}</p>;

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Properties */}
//             {properties.map((property) => (
//                 <Item key={property.title} property={property} />
//             ))}

//             {/* Tenants */}
//             {tenants.map((tenant) => (
//                 <TenantItem key={tenant.title} tenant={tenant} />
//             ))}

//             {/* Items */}
//             {items.map((item) => (
//                 <SellItem key={item.title} item={item} />
//             ))}
//         </div>
//     );
// };

// export default UserItemsList;

import React, { useEffect, useState, useRef } from "react";
import { getUserProperty, getUserTenant, getUserItem } from "../utils/api";
import Item from "./Item";
import TenantItem from "./TenantItem";
import SellItem from "./SellItem";

const UserItemsList = ({ userEmail }) => {
    const [properties, setProperties] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scrollRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propertyData, tenantData, itemData] = await Promise.all([
                    getUserProperty(userEmail),
                    getUserTenant(userEmail),
                    getUserItem(userEmail),
                ]);

                setProperties(propertyData);
                setTenants(tenantData);
                setItems(itemData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div
            ref={scrollRef}
            className="overflow-x-scroll scrollbar-hide mb-4 relative px-0.5"
            style={{ overflowY: "hidden", cursor: "grab" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
        >
            <div className="flex snap-x snap-mandatory gap-14 border border-gray-300 rounded-md" style={{ width: "max-content" }}>
                {/* Properties */}
                {properties.map((property) => (
                    <div key={property.title} className="flex-none w-64 snap-center">
                        <Item property={property} />
                    </div>
                ))}
                
                {/* Tenants */}
                {tenants.map((tenant) => (
                    <div key={tenant.title} className="flex-none w-64 snap-center">
                        <TenantItem tenant={tenant} />
                    </div>
                ))}
                
                {/* Items */}
                {items.map((item) => (
                    <div key={item.title} className="flex-none w-64 snap-center">
                        <SellItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserItemsList;

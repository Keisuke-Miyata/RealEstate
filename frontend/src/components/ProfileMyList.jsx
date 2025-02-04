import React, { useEffect, useState, useRef } from "react";
import { getUserProperty, getUserTenant, getUserItem, deleteResidency, deleteTenant, deleteItem, updateTenant, updateProperty, updateItem } from "../utils/api";
import Item from "./Item";
import TenantItem from "./TenantItem";
import SellItem from "./SellItem";
import DeleteButton from "./DeleteButton"
import UpdateButton from "./UpdateButton"

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

    // Handle Deletion
    const handleDelete = async (id, type) => {
        try {
            if (type === "property") {
                await deleteResidency(id);
                setProperties((prev) => prev.filter((property) => property.id !== id));
            } else if (type === "tenant") {
                await deleteTenant(id);
                setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
            } else if (type === "item") {
                await deleteItem(id);
                setItems((prev) => prev.filter((item) => item.id !== id));
            }
            alert(`${type} deleted successfully`);
        } catch (error) {
            alert(`Failed to delete ${type}: ${error.message}`);
        }
    };
    const handleUpdate = async (itemId, type) => {
        console.log(`Updating item with ID: ${itemId}`);
        try {
            if (type === "property") {
                await updateProperty(id);
            } else if (type === "tenant") {
                await updateTenant(id);
            } else if (type === "item") {
                await updateItem(id);
            }
            alert(`${type} updated successfully`);
        } catch (error) {
            alert(`Failed to update ${type}: ${error.message}`);
        }
    };

    // Dragging functionality
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
                    <div key={property.id} className="flex-none w-64 snap-center relative">
                        {/* <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                            onClick={() => handleDelete(property.id, "property")}
                        >
                            <FaTrash size={14} />
                        </button> */}
                        <UpdateButton
                            onUpdate={handleUpdate}
                            itemId={property.id}
                            itemType="property"
                        />

                        <DeleteButton
                            onDelete={handleDelete}
                            setState={setProperties}
                            itemId={property.id}
                            itemType="property"
                        />

                        <Item property={property} />
                    </div>
                ))}

                {/* Tenants */}
                {tenants.map((tenant) => (
                    <div key={tenant.id} className="flex-none w-64 snap-center relative">
                        {/* <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                            onClick={() => handleDelete(tenant.id, "tenant")}
                        >
                            <FaTrash size={14} />
                        </button> */}
                        <UpdateButton
                            onUpdate={handleUpdate}
                            itemId={tenant.id}
                            itemType="tenant"
                        />

                        <DeleteButton
                            onDelete={handleDelete}
                            setState={setTenants}
                            itemId={tenant.id}
                            itemType="tenant"
                        />

                        <TenantItem tenant={tenant} />
                    </div>
                ))}

                {/* Items */}
                {items.map((item) => (
                    <div key={item.id} className="flex-none w-64 snap-center relative">
                        {/* <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                            onClick={() => handleDelete(item.id, "item")}
                        >
                            <FaTrash size={14} />
                        </button> */}
                        <UpdateButton
                            onUpdate={handleUpdate}
                            itemId={item.id}
                            itemType="item"
                        />

                        <DeleteButton
                            onDelete={deleteItem}
                            setState={setItems}
                            itemId={item.id}
                            itemType="item"
                        />

                        <SellItem item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserItemsList;

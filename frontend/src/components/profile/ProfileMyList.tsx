import React, { useEffect, useState, useRef, FC, useContext } from "react";
import { getUserProperty, getUserTenant, getUserItem, deleteResidency, deleteTenant, deleteItem, updateTenant, updateProperty, updateItem } from "../../utils/api";
import Item from "../property/PropertyItem";
import TenantItem from "../tenant/TenantItem";
import SellItem from "../item/SellItem";
import DeleteButton from "../buttons/DeleteButton"
import UpdateButton from "../buttons/UpdateButton"
import UserDetailContext from "../../context/UserDetailContext";


interface UserItemsListProps {
    userEmail: string;
}

const UserItemsList: FC<UserItemsListProps> = ({ userEmail }) => {
    const [properties, setProperties] = useState<any[]>([]);
    const [tenants, setTenants] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const isDown = useRef<boolean>(false);
    const startX = useRef<number>(0);
    const scrollLeft = useRef<number>(0);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const [propertyData, tenantData, itemData]: [any[], any[], any[]] = await Promise.all([
                    getUserProperty(userEmail),
                    getUserTenant(userEmail),
                    getUserItem(userEmail),
                ]);

                setProperties(propertyData);
                setTenants(tenantData);
                setItems(itemData);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

    // Handle Deletion
    const handleDelete = async (id: string, type: string): Promise<void> => {
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(`Failed to delete ${type}: ${error.message}`);
            } else {
                alert(`Failed to delete ${type}: An unknown error occurred`);
            }
        }
    };


    const handleUpdate = async (itemId: string, updatedData: any, type: string): Promise<void> => {
        const { userDetails } = useContext(UserDetailContext);
        const token = userDetails.token ?? "";

        try {
            if (type === "property") {
                await updateProperty(itemId, updatedData, token);
            } else if (type === "tenant") {
                await updateTenant(itemId, updatedData, token);
            } else if (type === "item") {
                await updateItem(itemId, updatedData, token);
            }
            alert(`${type} updated successfully`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(`Failed to update ${type}: ${error.message}`);
            } else {
                alert(`Failed to update ${type}: An unknown error occurred`);
            }
        }
    };

    // Dragging functionality
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current!.offsetLeft;
        scrollLeft.current = scrollRef.current!.scrollLeft;
    };

    const handleMouseLeaveOrUp = (): void => {
        isDown.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!isDown.current) return;
        e.preventDefault();
        const x: number = e.pageX - scrollRef.current!.offsetLeft;
        const walk: number = (x - startX.current) * 1;
        scrollRef.current!.scrollLeft = scrollLeft.current - walk;
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
                        <UpdateButton
                            onUpdate={handleUpdate}
                            itemId={item.id}
                            itemType="item"
                        />

                        <DeleteButton
                            onDelete={(id: string): Promise<void> => handleDelete(id, 'item')}
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

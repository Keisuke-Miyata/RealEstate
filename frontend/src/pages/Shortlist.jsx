import React, { useEffect, useState } from "react"
import { getProperty, getTenant } from "../utils/api"
import { useSharecontext } from "../context/ShareProvider"
import Item from "../components/Item"
import TenantItem from "../components/TenantItem"

const Shortlist = () => {

    const { favorites } = useSharecontext();
    const [favoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPromises = favorites.map(async (fav) => {
                    let item = ""
                    if (fav.type === "place") {
                        item = await getProperty(fav.id);
                    } else if (fav.type === "seeker") {
                        item = await getTenant(fav.id);
                    }

                    if (item){
                        return {...item, category: fav.type}
                    }
                });

                const data = await Promise.all(dataPromises);
                const filteredData = data.filter((item) => item !== undefined); // Remove failed fetches

                setFavoriteItems(filteredData);
                // console.log(); // Log after setting state
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };

        fetchData();
    }, [favorites]);

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center">
                {favoriteItems.map((item) =>
                    item.category === "place" ? (
                        // Render places
                        <div
                            key={item.id}
                            className=" bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <Item key={item.id} property={item} />
                        </div>
                    ) : (
                        // Render seekers
                        <div
                            key={item.id}
                            className=" bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
                        >
                            <TenantItem key={item.id} tenant={item} />
                        </div>
                    )
                )}
            </div>
        </section>
    )
}

export default Shortlist
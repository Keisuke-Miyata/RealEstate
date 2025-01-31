import React from "react";
import { useSharecontext } from "../context/ShareProvider";
import Item from "../components/Item";

const ProfileMyList = () => {
    const { userResidencies } = useSharecontext();

    console.log(userResidencies)
    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Properties</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userResidencies.length > 0 ? (
                    userResidencies.map((residence) => (
                        <Item key={residence.id} property={residence} />
                    ))
                ) : (
                    <p>No properties listed.</p>
                )}
            </div>
        </section>
    );
};

export default ProfileMyList;

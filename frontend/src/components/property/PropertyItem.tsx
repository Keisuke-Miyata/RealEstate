import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaShower, FaHouseUser } from "react-icons/fa";
import { PropertyDetails } from "../../shared/types"



interface ItemProps {
    property: PropertyDetails;
}

const Item: FC<ItemProps> = ({ property }) => {
    const dateOnly: string = property?.dateAvailability ? new Date(property.dateAvailability).toISOString().split("T")[0] : "No date available";

    console.log(property)
    return (
        <Link to={`/property/${property.id}`}>
            <div
                key={property.id}
                className="card-border card-hover"
            >
                <img
                    src={property.image[0]}
                    alt="Listing"
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-2 flex items-center gap-4 price">
                    HUF {property.rent} / month
                    <span className="text-gray-800">{property.billsIncluded ? "Inc." : "Exc."} bills</span>
                </div>
                <div className="text-gray-700">{property.address}</div>
                <ul className="flex gap-4 mt-2 text-gray-600">
                    <li className="flex items-center gap-1">
                        <FaBed /> {property.room}
                    </li>
                    <li className="flex items-center gap-1">
                        <FaShower /> {property.bathroom}
                    </li>
                    <li className="flex items-center gap-1">
                        <FaHouseUser /> {property.tenants}
                    </li>
                    <li>{property.type} in Flatshare</li>
                </ul>
                <div className="text-sm text-gray-500">Available from {dateOnly}</div>
            </div>
        </Link>
    );
}

export default Item;
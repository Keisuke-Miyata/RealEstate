import React from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaShower, FaHouseUser } from "react-icons/fa";


const Item = ({ property }) => {

    const dateOnly = property.dateAvailability.split("T")[0];

    return (
        <Link to={`/place/${property.id}`}>
            <div
                key={property.id}
                className="card-border"
            >

                <img
                    src={property.image[0]}
                    alt="Listing"
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-2 flex items-center gap-4 text-gray-800">
                    HUF {property.rent} / month
                    <span>{property.billsIncluded ? "Inc." : "Exc."} bills</span>
                </div>
                <div className="text-gray-700">{property.address}</div>
                <ul className="flex gap-4 mt-2 text-gray-600">
                    <li className="flex items-center gap-1">
                        <FaBed /> {property.room}
                    </li>
                    <li className="flex items-center gap-1">
                        <FaShower /> {property.room}
                    </li>
                    <li className="flex items-center gap-1">
                        <FaHouseUser /> {property.room}
                    </li>
                    <li>{property.type} in Flatshare</li>
                </ul>
                <div className="text-sm text-gray-500">Available from {dateOnly}</div>

            </div>
        </Link>
    )
}

export default Item
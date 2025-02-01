import React from "react"
import { Link } from 'react-router-dom'

const SellItem = ({ item }) => {

    const dateOnly = item.createdAt.split("T")[0];

    return (
        <Link to={`/items/${item.id}`}>
            <div
                key={item.id}
                className="card-border"
            >

                <img
                    src={item.image[0]}
                    alt="Listing"
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-2 flex items-center gap-4 text-gray-800">
                    HUF {item.price} / month
                </div>
                <div className="text-gray-700">{item.address}</div>
                <div>{item.description}</div>
                <div>Posted at {dateOnly}</div>

            </div>
        </Link>
    )
}

export default SellItem
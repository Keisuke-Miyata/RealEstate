import React from "react"
import { Link } from 'react-router-dom'

const SellItem = ({ item }) => {

    const dateOnly = item.createdAt.split("T")[0];

    return (
        <Link to={`/items/${item.id}`}>
            <div
                key={item.id}
                className="card-border card-hover"
            >

                <img
                    src={item.image[0]}
                    alt="Listing"
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="p-4">

            <h2 className="text-xl font-semibold text-gray-900 truncate">
                {item.title}
            </h2>

            <div className="flex items-center justify-between">
                <span className="price">
                    HUF {item.price.toLocaleString()}
                </span>
                <span className="px-2 py-1 text-xs bg-gray-200 rounded-sm">
                    {item.condition || "Unknown Condition"}
                </span>
            </div>

            <p className="text-gray-600 text-sm truncate">
                📍{item.address}
            </p>

            <p className="text-gray-700 text-sm mt-2 line-clamp-2 text-overflow">
                {item.description}
            </p>

            <p className="text-xs text-gray-500 mt-3">📅 Posted at {dateOnly}</p>
        </div>

            </div>
        </Link>
    )
}

export default SellItem
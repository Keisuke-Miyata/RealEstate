import React from "react"
import { Link } from 'react-router-dom'

const SellItem = ({ item }) => {

    return (
        <div
            key={item.id}
            className="p-4 bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
        >
            <Link to={`/items/${item.id}`}>
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
                {/* <div className="text-sm text-gray-500">Posted: {item.date}</div> */}
            </Link>
        </div>
    )
}

export default SellItem
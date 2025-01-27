import React from "react"
import { useNavigate, Link } from 'react-router-dom'

const TenantsItem = ({ tenants }) => {
    return (
        <div
            key={tenants.id}
            className="p-4 bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
        >
            <Link to={`/seeker/${tenants.id}`}>
                <div className="flex items-center gap-4">
                    <img
                        src={tenants.image[0]}
                        alt="Seeker"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{tenants.name}</h3>
                        <p className="text-sm text-gray-500">Age: {teants.age}</p>
                        <p className="text-sm text-gray-500">
                            Budget: HUF {tenants.budget}
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-gray-700">{tenants.introduction}</p>
                <ul className="mt-2 text-sm text-gray-600">
                    {tenants.details.map((detail, index) => (
                        <li key={index}>- {detail}</li>
                    ))}
                </ul>
            </Link>
        </div>
    )
}

export default TenantsItem
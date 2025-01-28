import React from "react"
import { useNavigate, Link } from 'react-router-dom'

const TenantItem = ({ tenant }) => {
    return (
        <div
            key={tenant.id}
            className="p-4 bg-white shadow-md rounded-md flex flex-col h-full w-[300px]"
        >
            <Link to={`/seeker/${tenant.id}`}>
                <div className="flex items-center gap-4">
                    <img
                        src={tenant.image[0]}
                        alt="Seeker"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{tenant.name}</h3>
                        <p className="text-sm text-gray-500">Age: {tenant.age}</p>
                        <p className="text-sm text-gray-500">
                            Budget: HUF {tenant.monthlyBudget}
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-gray-700">{tenant.introduction}</p>
                <ul className="mt-2 text-sm text-gray-600">
                    {tenant.details.map((detail, index) => (
                        <li key={index}>- {detail}</li>
                    ))}
                </ul>
            </Link>
        </div>
    )
}

export default TenantItem
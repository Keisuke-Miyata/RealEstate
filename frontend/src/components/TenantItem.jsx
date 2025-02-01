import React from "react"
import { Link } from 'react-router-dom'

const TenantItem = ({ tenant }) => {
    return (
        <Link to={`/seeker/${tenant.id}`}>
            <div
                key={tenant.id}
                className="card-border"
            >

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

            </div>
        </Link>
    )
}

export default TenantItem
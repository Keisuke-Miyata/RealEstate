import React, { useState } from "react"
import useTenant from "../hooks/useTenant"
import { PuffLoader } from "react-spinners"
import TenantItem from "../components/TenantItem"

const Tenants = () => {
    const { data, isError, isLoading } = useTenant()
    if (isError) {
        return (
            <div>
                <span>Error while fetching data</span>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="puffloader">
                <PuffLoader
                    height="80"
                    width="80"
                    radius={1}
                    color="#555"
                    aria-label="puff-loading"
                />
            </div>
        )
    }

    return (
        <main className="max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">

            {data.length === 0 ? (
                <div className="text-center text-gray-500 mt-28">
                    <h2 className="text-2xl font-semibold">No favorite items yet</h2>
                    <p className="mt-2">Browse and add properties, tenants, or items to your favorites.</p>
                </div>
            ):(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center mt-28">
                {data.map((tenant) =>
                    <TenantItem key={tenant.title} tenant={tenant} />
                )}
            </div>
            )}
        </main>
    )
}

export default Tenants
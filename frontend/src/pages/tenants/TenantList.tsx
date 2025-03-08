import React, { FC } from "react"
import useTenant from "../../hooks/useTenant"
import { PuffLoader } from "react-spinners"
import TenantItem from "../../components/tenant/TenantItem"
import { TenantFormData } from "../../shared/types"

const TenantList: FC = () => {
    const { data, isError, isLoading }: { data: TenantFormData[]; isError: boolean; isLoading: boolean; } = useTenant()

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
                    color="#555"
                    aria-label="puff-loading"
                />
            </div>
        )
    }

    return (
        <main className="max-w-[1440px] mx-auto min-h-screen">
            {data.length === 0 ? (
                <div className="flex items-center justify-center">
                    <div className="text-center text-gray-500 mt-[400px]">
                        <h2 className="text-2xl font-semibold">No one is looking for place yet</h2>
                        <p className="mt-2">Take a look at other tabs.</p>
                    </div>
                </div>
            ) : (
                <div className="card-container mt-28">
                    {data.map((tenant: TenantFormData) =>
                        <TenantItem key={tenant.id} tenant={tenant} />
                    )}
                </div>
            )}
        </main>
    )
}

export default TenantList;
import React, { useState } from "react"
import useProperties from "../hooks/useProperties"
import{ PuffLoader } from "react-spinners"
import Item from "../components/Item"

const Place = () => {
    const { data, isError, isLoading } = useProperties()
    if (isError){
        return (
            <div>
                <span>Error while fetching data</span>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>
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
        <main>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center">
                    {data.map((property) =>
                        <Item key={property.title} property={property} />
                        )}
                </div>
            </div>
        </main>
    )
}

export default Place
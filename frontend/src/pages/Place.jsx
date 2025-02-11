import React, { useState } from "react"
import useProperties from "../hooks/useProperties"
import{ PuffLoader } from "react-spinners"
import Item from "../components/Item"

const Place = () => {
    const { data, isError, isLoading } = useProperties()
    console.log(data)
    if (isError){
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
        <main className="max-w-[1440px] mx-auto">
                <div className="card-container mt-32 mb-10">
                    {data.map((property) =>
                        <Item key={property.title} property={property} />
                        )}
                </div>
        </main>
    )
}

export default Place
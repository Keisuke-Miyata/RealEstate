import React, { FC } from "react"
import useProperties from "../../hooks/useProperties"
import { PuffLoader } from "react-spinners"
import Item from "../../components/property/PropertyItem"
import { PropertyDetails } from "../../shared/types"

const PropertyList: FC = () => {
    const { data, isError, isLoading }: { data: PropertyDetails[]; isError: boolean; isLoading: boolean } = useProperties()
    console.log(data)

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
        <main className="max-w-[1440px] mx-auto">
            <div className="card-container mt-32 mb-10">
                {data.map((property: PropertyDetails) =>
                    <Item key={property.title} property={property} />
                )}
            </div>
        </main>
    )
}

export default PropertyList;
import React, { useState } from "react"
import { PuffLoader } from "react-spinners"
import SellItem from "../components/SellItem"
import useItems from "../hooks/useItems"
import { useNavigate } from "react-router"
import house from "../assets/house.jpg"


const Items = () => {
    let navigate = useNavigate()
    const { data, isError, isLoading } = useItems()
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
            <div className="flex justify-center items-center mt-32">
                <div className="col-start-1 col-span-1 w-[340px] justify-items-center">
                    <button
                        onClick={() => navigate("/item")}
                        className="bg-red-200 px-6 py-6 rounded-md hover:bg-orange-300 transition flex justify-center items-center">
                        <div>
                            Offering an item
                            <h4 className="bg-black text-white mt-2 py-2 text-center rounded-md">I need buyers</h4>
                        </div>
                        <div>
                            <img src={house} alt="House" className="h-20 ml-4" />
                        </div>
                    </button>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 place-items-center mt-10">
                    {data.map((item) =>
                        <SellItem key={item.title} item={item} />
                    )}
                </div>
        </main>
    )
}

export default Items
import React from "react"
import { useQuery } from "react-query"
import { getAllItems } from "../utils/api"

const useItems = () => {
    const {data, isLoading, isError, refetch } = useQuery(
        "allItems",
        getAllItems,
        { refetchOnWindowFocus: false }
    )

    return {
        data, isError, isLoading, refetch
    }
}

export default useItems
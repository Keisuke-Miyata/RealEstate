import React from "react"
import { useQuery } from "react-query"
import { getAllTenants } from "../utils/api"

const useTenant = () => {
    const {data, isLoading, isError, refetch } = useQuery(
        "allTenants",
        getAllTenants,
        { refetchOnWindowFocus: false }
    )

    return {
        data, isError, isLoading, refetch
    }
}

export default useTenant
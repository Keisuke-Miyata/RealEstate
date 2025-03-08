import React from "react"
import { useQuery } from "react-query"
import { getAllTenants } from "../utils/api"

interface TenantData {
    // Define the structure of tenant data here
}

const useTenant = (): {
    data: any;
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
} => {
    const {data, isLoading, isError, refetch} = useQuery<TenantData[], Error>(
        "allTenants",
        getAllTenants,
        { refetchOnWindowFocus: false }
    )

    return {
        data, isError, isLoading, refetch
    }
}

export default useTenant
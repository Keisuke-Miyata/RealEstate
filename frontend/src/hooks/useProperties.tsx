import React from "react"
import { useQuery } from "react-query"
import { getAllProperties } from "../utils/api"

const useProperties = (): {
    data: any;
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
} => {
    const { data, isLoading, isError, refetch } = useQuery(
        "allProperties",
        getAllProperties,
        { refetchOnWindowFocus: false }
    )

    return {
        data, isError, isLoading, refetch
    }
}

export default useProperties
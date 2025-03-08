import React from "react"
import { useQuery } from "react-query"
import { getAllItems } from "../utils/api"

const useItems = (): {
    data: any;
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
} => {
    const { data, isLoading, isError, refetch } = useQuery<any, Error>(
        "allItems",
        getAllItems,
        { refetchOnWindowFocus: false }
    )

    return {
        data, isError, isLoading, refetch
    }
}

export default useItems
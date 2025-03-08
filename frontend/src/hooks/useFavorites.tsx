import React, { useContext, useEffect, useRef } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav } from '../utils/api'
import UserDetailContext from '../context/UserDetailContext'

const useFavorites = () => {
    const context = useContext(UserDetailContext)

    const { userDetails, setUserDetails } = context;
    const queryRef = useRef<(() => void) | null>(null)
    const { user } = useAuth0()

    const { data, isLoading, isError, refetch }: UseQueryResult<any[], Error> = useQuery({
        queryKey: "allFavourites",
        queryFn: () => getAllFav(user?.email || "", userDetails.token ?? ""),
        onSuccess: (data: any[]) => setUserDetails((prev) => ({ ...prev, favourites: Array.isArray(data) ? data : [] })),
        enabled: user !== undefined,
        staleTime: 30000
    })

    queryRef.current = refetch;

    useEffect(() => {
        if (queryRef.current) {
            queryRef.current()
        }
    }, [userDetails.token])

    return { data, isError, isLoading, refetch }
}

export default useFavorites

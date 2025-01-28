import { useAuth0 } from "@auth0/auth0-react";
import React, {useState, useContext, useEffect} from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import useAuthCheck from "../hooks/useAuthCheck";
import { useMutation } from "react-query"
import { toFav } from "../utils/api"
import UserDetailContext from "../context/UserDetailContext"
import { checkFavourites, updateFavourites } from "../utils/common.js";
// import useFavorites from "../hooks/useFavorites"

const FavoriteButton = ({id}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useAuth0()
    const { validateLogin } = useAuthCheck()
    // const { data, isLoading } = useFavorites()

    const { userDetails: { token, favourites = [] }, setUserDetails } = useContext(UserDetailContext)

    const { mutate } = useMutation({
        mutationFn: () => toFav(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev)=>({
                ...prev,
                favourites: updateFavourites(id, prev.favourites || [])
            }))
        }
    })

    const handleFav = () => {
        if (validateLogin()) {
            mutate()
            setIsFavorite((prev)=>!prev)
        }
    }

    useEffect(()=> {
        setIsFavorite((checkFavourites(id, favourites)))
    }, [favourites])

    return (
        <button
                        onClick={handleFav}
                        className="absolute top-5 right-5 z-20 flex items-center px-4 py-2 bg-white rounded-lg shadow-md border hover:bg-gray-100 focus:ring focus:ring-blue-300"
                    >
                        {isFavorite ? (
                            <FaStar className="w-5 h-5 mr-2 text-yellow-500" />
                        ) : (
                            <FaRegStar className="w-5 h-5 mr-2 text-gray-500" />
                        )}
                        <span className="text-gray-700">{isFavorite ? "Favorited" : "Favorite"}</span>
                    </button>
    )
}

export default FavoriteButton
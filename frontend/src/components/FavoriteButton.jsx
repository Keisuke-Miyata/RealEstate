import { useAuth0 } from "@auth0/auth0-react";
import React, {useState, useContext, useEffect} from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import useAuthCheck from "../hooks/useAuthCheck";
import { useSharecontext } from "../context/ShareProvider.jsx"

const FavoriteButton = ({ id, type }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useAuth0()
    const { validateLogin } = useAuthCheck()

    const { favorites, addFavorite, clearFavorites, removeFavorite } = useSharecontext()


    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("userFavorites")) || [];
        setIsFavorite(storedFavorites.some((fav) => fav.id === id))
    }, [id]);

    const handleFavoriteClick = () => {
        if (isFavorite){
            removeFavorite(id)
            alert(`${id} removed`)
        } else {
            addFavorite(id, type)
            alert(`${id} added to bookmarks`)
        }
        setIsFavorite(prev => !prev)
        console.log(favorites)
    }

    return (
        <button
                        onClick={(e) => handleFavoriteClick(id)}
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
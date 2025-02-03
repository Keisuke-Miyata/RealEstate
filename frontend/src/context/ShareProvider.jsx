import { useEffect, useContext, useState, createContext } from "react"
import { getProperty, getTenant, getItem } from "../utils/api"; // Import API functions
import { useAuth0 } from "@auth0/auth0-react"

const SharedContext = createContext()
export const useSharecontext = () => useContext(SharedContext);


export const ShareProvider = ({ children }) => {
    const LocalStorageKey = "userFavorites";
    const [favoriteItems, setFavoriteItems] = useState([]);


    const [favorites, setFavorites] = useState(()=> {
        const storedFavorites = JSON.parse(localStorage.getItem(LocalStorageKey))
        return Array.isArray(storedFavorites) ? storedFavorites : []
    });

    const addFavorite = (id, type) => {
        setFavorites((prev) => {
            const updatedFavorites = [...prev, {id, type}];
            localStorage.setItem(LocalStorageKey, JSON.stringify(updatedFavorites));  // Update localStorage
            return updatedFavorites;
        });
    }

    useEffect(()=> {
        localStorage.setItem(LocalStorageKey, JSON.stringify(favorites));
    }, [favorites])


    const clearFavorites = () => {
        localStorage.removeItem(LocalStorageKey);
        setFavorites([]);
    };

    const removeFavorite = (favId) => {
        setFavorites((prev) => {
            const updatedFavorites = prev.filter((fav) => fav.id !== favId);
            localStorage.setItem(LocalStorageKey, JSON.stringify(updatedFavorites));  // Update localStorage
            return updatedFavorites;
        });
    };

    useEffect(() => {
        // Sync localStorage with favorites state whenever favorites change
        localStorage.setItem(LocalStorageKey, JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPromises = favorites.map(async (fav) => {
                    let item = null;
                    if (fav.type === "place") {
                        item = await getProperty(fav.id);
                    } else if (fav.type === "seeker") {
                        item = await getTenant(fav.id);
                    } else if (fav.type === "items") {
                        item = await getItem(fav.id);
                    }

                    if (item) {
                        return { ...item, category: fav.type };
                    }
                    return null;
                });

                const data = await Promise.all(dataPromises);
                setFavoriteItems(data.filter((item) => item !== null)); // Remove null values
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };

        if (favorites.length > 0) {
            fetchData();
        } else {
            setFavoriteItems([]); // Reset if no favorites
        }
    }, [favorites]);


    return (
        <SharedContext.Provider
            value={{ favorites, addFavorite, clearFavorites, removeFavorite, favoriteItems}}
        >
            {children}
        </SharedContext.Provider>
    )
}
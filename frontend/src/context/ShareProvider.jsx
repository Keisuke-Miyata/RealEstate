import { useEffect, useContext, useState, createContext } from "react"

const SharedContext = createContext()
export const useSharecontext = () => useContext(SharedContext);


export const ShareProvider = ({ children }) => {
    const LocalStorageKey = "userFavorites";
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

    return (
        <SharedContext.Provider
            value={{ favorites, addFavorite, clearFavorites, removeFavorite}}
        >
            {children}
        </SharedContext.Provider>
    )
}
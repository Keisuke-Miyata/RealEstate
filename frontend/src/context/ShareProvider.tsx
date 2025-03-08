import React, { FC, useEffect, useContext, useState, ReactNode, createContext } from "react";
import { getProperty, getTenant, getItem } from "../utils/api";
import { useAuth0 } from "@auth0/auth0-react";

interface Favorite {
    id: string;
    type: string;
}

interface SharedContextType {
    favorites: Favorite[];
    addFavorite: (id: string, type: string) => void;
    clearFavorites: () => void;
    removeFavorite: (favId: string) => void;
    favoriteItems: any[];
}

const SharedContext = createContext<SharedContextType | undefined>(undefined);
export const useSharecontext = (): SharedContextType => {
    const context = useContext(SharedContext);
    if (!context) {
        throw new Error("useSharecontext must be used within a ShareProvider");
    }
    return context;
};

interface ShareProviderProps {
    children: ReactNode;
}

export const ShareProvider: FC<ShareProviderProps> = ({ children }) => {
    const LocalStorageKey: string = "userFavorites";
    const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [favorites, setFavorites] = useState<Favorite[]>(() => {
        const storedFavorites = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]');
        return Array.isArray(storedFavorites) ? storedFavorites : [];
    });

    useEffect(() => {
        console.log("favoriteItems", favoriteItems)
    }, [favoriteItems])

    const addFavorite = (id: string, type: string): void => {
        setFavorites((prev) => {
            const updatedFavorites = [...prev, { id, type }];
            localStorage.setItem(LocalStorageKey, JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    useEffect(() => {
        localStorage.setItem(LocalStorageKey, JSON.stringify(favorites));
    }, [favorites]);


    const clearFavorites = (): void => {
        localStorage.removeItem(LocalStorageKey);
        setFavorites([]);
    };


    const removeFavorite = (favId: string): void => {
        setFavorites((prev) => {
            const updatedFavorites = prev.filter((fav) => fav.id !== favId);
            localStorage.setItem(LocalStorageKey, JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPromises = favorites.map(async (fav) => {
                    let item = null;
                    console.log("fav type: ", fav.type)

                    if (fav.type === "property") {
                        item = await getProperty(fav.id);
                    } else if (fav.type === "tenant") {
                        item = await getTenant(fav.id);
                    } else if (fav.type === "item") {
                        item = await getItem(fav.id);
                    }

                    if (item) {
                        return { ...item, category: fav.type };
                    }
                    return null;
                });

                const data = await Promise.all(dataPromises);
                setFavoriteItems(data.filter((item) => item !== null));
            } catch (error) {
                console.error("Error fetching favorite items:", error);
            }
        };


        if (favorites.length > 0) {
            fetchData();
        } else {
            setFavoriteItems([]);
        }
    }, [favorites]);



    return (
        <SharedContext.Provider
            value={{ favorites, addFavorite, clearFavorites, removeFavorite, favoriteItems }}
        >
            {children}
        </SharedContext.Provider>
    );
};
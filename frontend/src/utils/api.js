import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getAllProperties = async () => {
    try {
        const response = await api.get("/property/allProperties", {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500){
            throw response.data
        }
        return response.data.reverse()
    } catch (error) {
        throw error
    }
}

export const getProperty = async (id) => {
    try {
        const response = await api.get(`/property/${id}`, {
            timeout: 10* 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const createUser = async (email, name, token) => {
    try {
        await api.post(`/user/register`, { email, name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (error) {
        throw error
    }
}

export const getUser = async (email, token) => {
    try {
        const res = await api.get(`/user/${email}`, {email},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data || null;
    } catch (error){
        console.error("Error fetching user:", error)
        return null
    }
}

export const toFav = async (id, email, token) => {
    try {
        await api.post(`/user/toFav/${id}`,
            {email},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (e) {
        throw e
    }
}

export const getAllFav = async (email, token) => {
    if (!token) return []
    try {
        const res = await api.get(`/user/allFav`,
            {email},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return res.data["favPropertyID"] || []
    } catch (e) {
        console.error("error getting favorites")
        return []
    }
}

export const createResidency = async (data, token, userEmail) => {
    const requestData = {...data, userEmail }
    console.log(requestData)

    try {
        const res = await api.post(`/property/createProperty`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (e) {
        throw e
    }
}

export const createTenant = async (data, token, userEmail) => {
    const requestData = {...data, userEmail}
    console.log(requestData)

    try {
        const res = await api.post(`/tenant/createTenant`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (e) {
        throw e
    }
}

export const getAllTenants = async () => {
    try {
        const response = await api.get(`/tenant/allTenants`, {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500){
            throw response.data
        }
        return response.data.reverse()
    } catch (error) {
        throw error
    }
}

export const getTenant = async (id) => {
    try {
        const response = await api.get(`/tenant/${id}`, {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllItems = async () => {
    try {
        const response = await api.get("/item/allItems", {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500){
            throw response.data
        }
        return response.data.reverse()
    } catch (error) {
        throw error
    }
}

export const getItem = async (id) => {
    try {
        const response = await api.get(`/item/${id}`, {
            timeout: 10* 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw error
    }
}

export const createItem = async (data, token, userEmail) => {
    const requestData = {...data, userEmail}
    console.log(requestData)

    try {
        const res = await api.post(`/item/createItem`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (e) {
        throw e
    }
}

export const getUserProperty = async (email) => {
    try {
        const response = await api.get(`/property/allUserProperties`, {
            params: { email },
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching user's properties:", error)
        throw error
    }
}

export const getUserTenant = async (email) => {
    try {
        const response = await api.get(`/tenant/allUserTenants`, {
            params: { email },
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching user's properties:", error)
        throw error
    }
}

export const getUserItem = async (email) => {
    try {
        const response = await api.get(`/item/allUserItems`, {
            params: { email },
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500){
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching user's properties:", error)
        throw error
    }
}

// 🏠 Delete Residency
export const deleteResidency = async (id) => {
    try {
        const response = await api.delete(`/property/delete/${id}`, { timeout: 10 * 1000 });

        if (response.status === 400 || response.status === 500) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting residency:", error);
        throw error;
    }
};

// 🏢 Delete Tenant
export const deleteTenant = async (id) => {
    try {
        const response = await api.delete(`/tenant/delete/${id}`, { timeout: 10 * 1000 });

        if (response.status === 400 || response.status === 500) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting tenant:", error);
        throw error;
    }
};

// 🏷️ Delete Item
export const deleteItem = async (id) => {
    try {
        const response = await api.delete(`/item/delete/${id}`, { timeout: 10 * 1000 });

        if (response.status === 400 || response.status === 500) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};

export const updateItem = async (id, updatedData, token) => {
    try {
        const response = await api.put(`/item/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
};

export const updateProperty = async (id, updatedData, token) => {
    try {
        const response = await api.put(`/property/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating property:", error);
        throw error;
    }
};

export const updateTenant = async (id, updatedData, token) => {
    try {
        const response = await api.put(`/tenant/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Server Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error updating tenant:", error?.response?.data || error.message);
        throw error;
    }
};

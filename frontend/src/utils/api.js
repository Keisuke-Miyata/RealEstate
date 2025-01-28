import axios from "axios"
import { data } from "react-router-dom"

export const api = axios.create({
    baseURL: "http://localhost:3000/api"
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

export const createUser = async (email, token) => {
    try {
        await api.post(`/user/register`, { email },
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
    if (!token) return
    try {
        const res = await api.post(`/user/allFav`,
            {email},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return res.data["favPropertyID"]
    } catch (e) {
        throw e
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
    // console.log(`Fetching tenant with ID: ${id}`);
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

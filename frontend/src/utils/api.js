import axios from "axios"

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
        return res.data["favResidenciesID"]
    } catch (e) {
        throw e
    }
}

export const createResidency = async (data, token, userEmail) => {
    const requestData = {...data, userEmail }
    console.log(requestData)

    try {
        const res = await api.post(`/residency/create`,
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
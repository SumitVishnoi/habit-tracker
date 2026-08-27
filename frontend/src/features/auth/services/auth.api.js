import axios from "axios";

const authApiInstance = axios.create({
    baseURL:"/api",
    withCredentials: true
})

export const register = async ({name, email, password, timezone}) => {
    const response = await authApiInstance.post("/auth/register", {
        name,
        email,
        password,
        timezone
    })

    return response.data
}

export const login = async ({email, password}) => {
    const response = await authApiInstance.post("/auth/login", {
        email,
        password
    })

    return response.data
}

export const getCurrentUser = async () => {
    const response = await authApiInstance.get("/auth/me")

    return response.data
}

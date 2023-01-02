import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "8614550c-4c8b-4fe3-b9f9-9f1557c13df5"
    }
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5) {
        return ( await axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`) ).data;
    },
    async follow(userId) {
        return ( await axiosInstance.post(`follow/${userId}`) ).data;
    },
    async unfollow(userId) {
        return ( await axiosInstance.delete(`follow/${userId}`) ).data
    }
};

export const authAPI = {
    async getAuth() {
        return ( await axiosInstance.get("auth/me") ).data;
    },
    async login(email, password, rememberMe) {
        return ( await axiosInstance.post("auth/login", {
            email,
            password,
            rememberMe
        }) ).data;
    },
    async logout() {
        return (await axiosInstance.delete("auth/login")).data;
    }
};

export const profileAPI = {
    async getUser(userId) {
        return ( await axiosInstance.get(`profile/${userId}`) ).data;
    },

    async getStatus(userId) {
        return ( await axiosInstance.get(`profile/status/${userId}`)).data;
    },

    async updateStatus(status) {
        return ( await axiosInstance.put(`profile/status`, { status }) ).data;
    }
};
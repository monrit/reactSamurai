import { UserType } from "../types/types";
import { ResponseType, axiosInstance } from "./api";

type GetUsersResponseType = {
    items: Array<UserType>;
    totalCount: number;
    error: string;
};

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5) {
        return (await axiosInstance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)).data;
    },
    async follow(userId: number) {
        return (await axiosInstance.post<ResponseType>(`follow/${userId}`)).data;
    },
    async unfollow(userId: number) {
        return (await axiosInstance.delete<ResponseType>(`follow/${userId}`)).data;
    },
    async getFriends(currentPage = 1, pageSize = 5) {
        return (await axiosInstance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}%friend=true`)).data;
    }
};

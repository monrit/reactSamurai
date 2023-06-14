import { InputsType } from "../components/Profile/ProfileInfo/ProfileInfoForm/ProfileInfoForm";
import { PhotosType, ProfileType } from "../types/types";
import { ResponseType, axiosInstance } from "./api";

type UpdateProfilePictureResponseDataType = {
    photos: PhotosType;
};

export const profileAPI = {
    async getUser(userId: number) {
        return (await axiosInstance.get<ProfileType>(`profile/${userId}`)).data;
    },

    async getStatus(userId: number) {
        return (await axiosInstance.get<string>(`profile/status/${userId}`)).data;
    },

    async updateStatus(status: string) {
        return (await axiosInstance.put<ResponseType>(`profile/status`, { status })).data;
    },

    async updateProfilePicture(image: File) {
        const formData = new FormData();
        formData.append("image", image);
        return (await axiosInstance.put<ResponseType<UpdateProfilePictureResponseDataType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        )).data;
    },

    async updateProfileInfo(userInfo: InputsType) {
        return (await axiosInstance.put<ResponseType>(`profile`, userInfo)).data;
    }
};

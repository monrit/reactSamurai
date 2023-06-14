import { ResponseType, ResultCodesEnum, ResultCodeForCaptchaEnum, axiosInstance } from "./api";

type GetAuthResponseDataType = {
    id: number;
    email: string;
    login: string;
};

type LoginResponseDataType = {
    userId: number;
};

type LoginResultCodesType = ResultCodesEnum | ResultCodeForCaptchaEnum;

export const authAPI = {
    async getAuth() {
        return (await axiosInstance.get<ResponseType<GetAuthResponseDataType>>("auth/me")).data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return (await axiosInstance.post<ResponseType<LoginResponseDataType, LoginResultCodesType>>("auth/login", {
            email,
            password,
            rememberMe,
            captcha
        })).data;
    },
    async logout() {
        return (await axiosInstance.delete<ResponseType>("auth/login")).data;
    }
};
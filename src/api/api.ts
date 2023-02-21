import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY
    }
});

export enum ResultCodesEnum {
    success = 0,
    error = 1
};

export enum ResultCodeForCaptchaEnum {
    captchaIsRequired = 10
};

export type ResponseType<T = {}, RC = ResultCodesEnum> = {
    data: T,
    resultCode: RC,
    messages: Array<string>
};
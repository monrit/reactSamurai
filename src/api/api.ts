import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "8614550c-4c8b-4fe3-b9f9-9f1557c13df5"
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
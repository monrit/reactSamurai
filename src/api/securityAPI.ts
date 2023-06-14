import { axiosInstance } from "./api";

type GetCaptchaUrlResponseType = {
    url: string;
};

export const securityAPI = {
    async getCaptchaUrl() {
        return (await axiosInstance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)).data;
    }
};

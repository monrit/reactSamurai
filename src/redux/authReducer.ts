import { authAPI, securityAPI } from "../api/api";
import { globalError } from "./appReducer";
import { resetProfileState } from "./profileReducer";

const SET_USER_DATA = "auth/SET-USER-DATA";
const RESET_USER_DATA = "auth/RESET-USER-DATA";
const SET_CAPTCHA_URL = "auth/SET-CAPTCHA-URL";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState;

type ActionType = SetUserDataActionType | SetCaptchaUrlActionType | ResetUserDataActionType;

function authReducer(state = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case SET_USER_DATA:
        case RESET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: {
        id: number,
        email: string,
        login: string,
        isAuth: boolean
    }
};
type ResetUserDataActionType = {
    type: typeof RESET_USER_DATA,
    payload: InitialStateType
};
type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: {
        captchaUrl: string
    }
};

const setUserData = (id: number, email: string, login: string, isAuth: boolean): SetUserDataActionType => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
const resetUserData = (): ResetUserDataActionType => ({ type: RESET_USER_DATA, payload: { ...initialState } });
const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } });

export const getAuth = () => async (dispatch: any) => {
    try {
        const data = await authAPI.getAuth()
        if (data.resultCode === 0) {
            const { id, email, login } = data.data;
            dispatch(setUserData(id, email, login, true));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, setError: any, captcha: string | null = null) => async (dispatch: any) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuth());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            setError("server", {
                type: "custom",
                message: data.messages
            });
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const logout = () => async (dispatch: any) => {
    try {
        const data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(resetUserData());
            dispatch(resetProfileState());
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

const getCaptchaUrl = () => async (dispatch: any) => {
    try {
        const data = await securityAPI.getCaptchaUrl();
        dispatch(setCaptchaUrl(data.url));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export default authReducer;
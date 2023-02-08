import { ThunkAction } from "redux-thunk";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { globalError } from "./appReducer";
import { actions as profileActions } from "./profileReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";
const { resetProfileState } = profileActions;

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
type ActionType = InferActionsTypes<typeof actions>;

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

const actions = {
    setUserData: (id: number, email: string, login: string, isAuth: boolean) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } } as const),
    resetUserData: () => ({ type: RESET_USER_DATA, payload: { ...initialState } } as const),
    setCaptchaUrl: (captchaUrl: string) => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } } as const)
};

type DispatchActionsType = ActionType | ReturnType<typeof resetProfileState>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, DispatchActionsType>;

export const getAuth = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.getAuth()
        if (data.resultCode === ResultCodesEnum.success) {
            const { id, email, login } = data.data;
            dispatch(actions.setUserData(id, email, login, true));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, setError: any, captcha: string | null = null): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodesEnum.success) {
            dispatch(getAuth());
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.captchaIsRequired) {
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

export const logout = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.logout();
        if (data.resultCode === ResultCodesEnum.success) {
            dispatch(actions.resetUserData());
            dispatch(resetProfileState());
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    try {
        const data = await securityAPI.getCaptchaUrl();
        dispatch(actions.setCaptchaUrl(data.url));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export default authReducer;
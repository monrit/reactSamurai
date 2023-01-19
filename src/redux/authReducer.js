import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const SET_CAPTCHA_URL = "auth/SET-CAPTCHA-URL"

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

const setUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } });

export const getAuth = () => async (dispatch) => {
    const data = await authAPI.getAuth()
    if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setUserData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe, setError, captcha = null) => async (dispatch) => {
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
};

export const logout = () => async (dispatch) => {
    const data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
};

const getCaptchaUrl = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url));
}

export default authReducer;
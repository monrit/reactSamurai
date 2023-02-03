import { getAuth } from "./authReducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED-SUCCESS";
const GLOBAL_ERROR = "app/GLOBAL-ERROR";

export type GlobalErrorType = any;

export type InitialStateType = {
    initialized: boolean,
    globalError: GlobalErrorType
};

const initialState: InitialStateType = {
    initialized: false,
    globalError: null
};

type ActionType = SetInitializedActionType | SetGlobalErrorActionType;

function appReducer(state = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case GLOBAL_ERROR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetInitializedActionType = {
    type: typeof INITIALIZED_SUCCESS
};

type SetGlobalErrorActionType = {
    type: typeof GLOBAL_ERROR,
    payload: {
        globalError: GlobalErrorType
    }
};

const setInitialized = (): SetInitializedActionType => ({ type: INITIALIZED_SUCCESS });
export const setGlobalError = (error: GlobalErrorType): SetGlobalErrorActionType => ({ type: GLOBAL_ERROR, payload: { globalError: error }});

export const globalError = (error: GlobalErrorType) => (dispatch: any) => {
    dispatch(setGlobalError(error));
    setTimeout((): void => {
        dispatch(setGlobalError(null));
    }, 5000);
};

export const initializeApp = () => async (dispatch: any) => {
    try {
        await dispatch(getAuth());
        dispatch(setInitialized());
    } catch (err) {
        dispatch(globalError(err));
    }
};

export default appReducer;
import { getAuth } from "./authReducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED-SUCCESS";

const initialState = {
    initialized: false
};

function appReducer(state = initialState, action = []) {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const setInitialized = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuth())
    dispatch(setInitialized());
};

export default appReducer;
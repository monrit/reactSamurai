import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { globalError, GlobalErrorType } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";

const SET_FRIENDS = "sidebar/SET-FRIENDS";

export type InitialStateType = {
    friends: Array<UserType>
};

const initialState: InitialStateType = {
    friends: []
};

type ActionType = InferActionsTypes<typeof actions>;

function sidebarReducer(state = initialState, action: ActionType): InitialStateType {
    switch(action.type) {
        case SET_FRIENDS:
            return {
                friends: action.friends
            }
        default: 
            return state;
    }
}

const actions = {
    setFriends: (friends: Array<UserType>) => ({ type: SET_FRIENDS, friends } as const)
};

type DispatchActionsType = ActionType & GlobalErrorType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, DispatchActionsType>;

export const getFriends = (): ThunkType => async (dispatch) => {
    try {   
        const data = await usersAPI.getFriends(1, 3);
        dispatch(actions.setFriends(data.items));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export default sidebarReducer;
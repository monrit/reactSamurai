import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { changePropsInObjArray } from "../utils/arrayIteration";
import { globalError } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { getFriends } from "./sidebarReducer";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS = "users/SET-TOTAL-USERS";
const SET_IS_FETCHING = "users/SET-IS-FETCHING";
const SET_FOLLOWING_IN_PROGRESS = "users/SET-FOLLOWING-IN-PROGRESS";

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalUsers: 100,
    pageSize: 10,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;

function usersReducer(state = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: changePropsInObjArray(state.users, "id", action.userId, { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: changePropsInObjArray(state.users, "id", action.userId, { followed: false })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            };
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setCurrentPage: (page: number) => ({ type: SET_CURRENT_PAGE, page } as const),
    setTotalUsers: (totalUsers: number) => ({ type: SET_TOTAL_USERS, totalUsers } as const),
    setIsFetching: (isFetching: boolean) => ({ type: SET_IS_FETCHING, isFetching } as const),
    setFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId } as const)
};


type DispatchActionsType = ActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, DispatchActionsType>;

export const getUsers = (currentPage: number, pageSize: number, friends: boolean | undefined): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    try {
        let data;
        if (friends) {
            data = await usersAPI.getFriends(currentPage, pageSize);
        } else {
            data = await usersAPI.getUsers(currentPage, pageSize);
        }
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setTotalUsers(data.totalCount));
    } catch (err) {
        dispatch(globalError(err));
    }
};

async function followUnfollowFlow(
    userId: number,
    apiMethod: any,
    dispatch: ThunkDispatch<AppStateType, unknown, ActionType>,
    actionCreator: (userId: number) => ReturnType<typeof actions.followSuccess> | ReturnType<typeof actions.unfollowSuccess>
    ) {
    dispatch(actions.setFollowingInProgress(true, userId));
    try {
        const data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            dispatch(globalError({message: data.messages[0]}));
        }
    } catch(err) {
        dispatch(globalError(err));
    }
    dispatch(getFriends());
    dispatch(actions.setFollowingInProgress(false, userId));
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    return followUnfollowFlow(userId, usersAPI.unfollow.bind(usersAPI), dispatch, actions.unfollowSuccess);
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    return followUnfollowFlow(userId, usersAPI.follow.bind(usersAPI), dispatch, actions.followSuccess);
};

export default usersReducer;
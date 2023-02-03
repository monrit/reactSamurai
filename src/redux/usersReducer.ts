import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { changePropsInObjArray } from "../utils/arrayIteration";
import { globalError } from "./appReducer";

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
type ActionType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersActionType | SetIsFetchingActionType | SetFollowingInProgressActionType;

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

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
};
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
};
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
};
type SetTotalUsersActionType = {
    type: typeof SET_TOTAL_USERS,
    totalUsers: number
};
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING,
    isFetching: boolean
};
type SetFollowingInProgressActionType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS,
    isFetching: boolean,
    userId: number
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsers = (totalUsers: number): SetTotalUsersActionType => ({ type: SET_TOTAL_USERS, totalUsers });
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: SET_IS_FETCHING, isFetching });
export const setFollowingInProgress = (isFetching: boolean, userId: number): SetFollowingInProgressActionType => ({ type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId });

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    try {
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(data.items));
        dispatch(setIsFetching(false));
        dispatch(setTotalUsers(data.totalCount));
    } catch (err) {
        dispatch(globalError(err));
    }
};

async function followUnfollowFlow(userId: number, apiMethod: any, dispatch: any, actionCreator: any) {
    dispatch(setFollowingInProgress(true, userId));
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
    dispatch(setFollowingInProgress(false, userId))
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(userId, usersAPI.unfollow.bind(usersAPI), dispatch, unfollowSuccess);
};

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(userId, usersAPI.follow.bind(usersAPI), dispatch, followSuccess);
};

export default usersReducer;
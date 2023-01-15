import { usersAPI } from "../api/api";
import { changePropsInObjArray } from "../utils/arrayIteration";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_CURRENT_PAGE = "users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS = "users/SET-TOTAL-USERS";
const SET_IS_FETCHING = "users/SET-IS-FETCHING";
const SET_FOLLOWING_IN_PROGRESS = "users/SET-FOLLOWING-IN-PROGRESS";

const initialState = {
    users: [],
    currentPage: 1,
    totalUsers: 100, //should be 0 and be taken from server, you have this feature in getUsers thunk creator
    pageSize: 10,
    isFetching: false,
    followingInProgress: []
};

function usersReducer(state = initialState, action = {}) {
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

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsers = (totalUsers) => ({ type: SET_TOTAL_USERS, totalUsers });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
export const setFollowingInProgress = (isFetching, userId) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId });

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
    dispatch(setTotalUsers(data.totalCount));
};

async function followUnfollowFlow(userId, apiMethod, dispatch, action) {
    dispatch(setFollowingInProgress(true, userId));

    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(action(userId));
    }
    dispatch(setFollowingInProgress(false, userId))
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(userId, usersAPI.unfollow.bind(usersAPI), dispatch, unfollowSuccess);
};

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(userId, usersAPI.follow.bind(usersAPI), dispatch, followSuccess);
};

export default usersReducer;
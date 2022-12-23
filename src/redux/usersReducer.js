import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS = "SET-TOTAL-USERS";
const SET_IS_FETCHING = "SET-IS-FETCHING";
const SET_FOLLOWING_IN_PROGRESS = "SET-FOLLOWING-IN-PROGRESS";

const initialState = {
    users: [],
    currentPage: 1,
    totalUsers: 100, //should be 0 and be taken from server, you have this feature in getUsers thunk creator
    pageSize: 5,
    isFetching: false,
    followingInProgress: []
};

function usersReducer(state = initialState, action = {}) {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: true
                        };
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: false
                        };
                    }
                    return user;
                })
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
export const unfollowSucces = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsers = (totalUsers) => ({ type: SET_TOTAL_USERS, totalUsers });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching })
export const setFollowingInProgress = (isFetching, userId) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize) => (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setUsers(data.items));
            dispatch(setIsFetching(false));
            //4400+ pages will apear !!NEEDS SOLUTION
            //dispatch( setTotalUsers(data.totalCount) );
        });
};

export const unfollow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(true, userId));
    usersAPI.unfollow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSucces(userId));
            }
            dispatch(setFollowingInProgress(false, userId));
        });
};

export const follow = (userId) => (dispatch) => {
    dispatch(setFollowingInProgress(true, userId));
    usersAPI.follow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(setFollowingInProgress(false, userId));
        });
};

export default usersReducer;
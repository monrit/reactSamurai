import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const DELETE_POST = "profile/DELETE-POST";
const LIKE = "profile/LIKE";

let initialState = {
    posts: [
        { id: 0, message: "First post", likes: 27 },
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 }
    ],
    profile: null,
    profileId: null,
    status: null
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            const post = {
                id: state.posts.length,
                message: action.text,
                likes: 0
            };
            return {
                ...state,
                posts: [...state.posts, post]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
                profileId: action.profile.userId
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.id) {
                        return {
                            ...post,
                            likes: post.likes + 1
                        }
                    } else {
                        return post;
                    }
                })
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        default:
            return state;
    }
}

export const addPost = (text) => ({ type: ADD_POST, text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const like = (id) => ({ type: LIKE, id });
export const deletePost = (id) => ({ type: DELETE_POST, id })

export const getUser = (userId) => async (dispatch) => {
    const data = await profileAPI.getUser(userId);
    dispatch(setUserProfile(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    };
};

export default profileReducer;
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const LIKE = "LIKE";

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
            const postsCpy = state.posts.slice();
            const ourPost = postsCpy.find(post => post.id === action.id);
            ourPost.likes++;
            postsCpy.splice(action.id, 1, ourPost);
            return {
                ...state,
                posts: postsCpy
            }
        default:
            return state;
    }
}

export const addPost = (text) => ({ type: ADD_POST, text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const like = (id) => ({ type: LIKE, id });

export const getUser = (userId) => (dispatch) => {
    profileAPI.getUser(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        });
};

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setUserStatus(data));
        })
};

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status));
            };
        });
};

export default profileReducer;
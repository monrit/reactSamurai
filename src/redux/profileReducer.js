import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_POST_INPUT = "UPDATE-POST-INPUT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

let initialState = {
    posts: [
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
        { id: 2, message: "First post", likes: 27 }
    ],
    userInputText: "",
    profile: null,
    status: null
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            const text = state.userInputText;
            if (!text) {
                return;
            }
            const post = {
                id: 3, //needs solution
                message: text,
                likes: 0
            };
            return {
                ...state,
                userInputText: "",
                posts: [...state.posts, post]
            };
        case UPDATE_POST_INPUT:
            return {
                ...state,
                userInputText: action.input
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const updatePostInput = (text) => ({ type: UPDATE_POST_INPUT, input: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });

export const getUser = (userId) => (dispatch) => {
    profileAPI.getUser(userId)
        .then(data => {
            dispatch( setUserProfile(data) );
        });
};

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch( setUserStatus(data) );
        })
};

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch( setUserStatus(status) );
            };
        });
};

export default profileReducer;
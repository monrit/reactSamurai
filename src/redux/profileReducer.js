import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_POST_INPUT = "UPDATE-POST-INPUT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
    posts: [
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15 },
        { id: 2, message: "First post", likes: 27 }
    ],
    userInputText: "",
    profile: null
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
        default:
            return state;
    }
}

export const addPost = () => ({ type: ADD_POST });
export const updatePostInput = (text) => ({ type: UPDATE_POST_INPUT, input: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const getUser = (userId) => (dispatch) => {
    profileAPI.getUser(userId)
        .then(data => {
            dispatch( setUserProfile(data) );
        });
};

export default profileReducer;
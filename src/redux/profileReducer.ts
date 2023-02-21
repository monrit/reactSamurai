import { profileAPI } from "../api/profileAPI";
import { globalError } from "./appReducer";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { InputsType } from "../components/Profile/ProfileInfo/ProfileInfoForm/ProfileInfoForm";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { usersAPI } from "../api/usersAPI";
import { follow as usersFollow, unfollow as usersUnfollow } from "./usersReducer"
import { getFriends } from "./sidebarReducer";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const RESET_PROFILE_STATE = "profile/RESET-PROFILE-STATE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const DELETE_POST = "profile/DELETE-POST";
const LIKE = "profile/LIKE";
const SET_PROFILE_PICTURE = "profile/SET-PROFILE-PICTURE";
const SET_FOLLOWED = "profile/SET-FOLLOWED";
const SET_FOLLOWING_IN_PROGRESS = "profile/SET-FOLLOWING-IN-PROGRESS";

const initialState = {
    posts: [
        { id: 0, message: "First post", likes: 27, liked: false },
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15, liked: false }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    followed: false,
    followingInProgress: false
};

type InitialStateType = typeof initialState;
type ActionType = InferActionsTypes<typeof actions>;

function profileReducer(state = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case ADD_POST:
            const id = state.posts[state.posts.length - 1]?.id;
            const post = {
                id: (id + 1) || 0,
                message: action.text,
                likes: 0,
                liked: false
            };
            return {
                ...state,
                posts: [...state.posts, post]
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
        case LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.id) {
                        return {
                            ...post,
                            likes: post.liked ? post.likes - 1 : post.likes + 1,
                            liked: !post.liked
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
        case SET_PROFILE_PICTURE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        case RESET_PROFILE_STATE:
            return {
                ...state,
                ...action.initialState
            }
        case SET_FOLLOWED: 
            return {
                ...state,
                followed: action.followed
            }
        case SET_FOLLOWING_IN_PROGRESS: 
            return {
                ...state,
                followingInProgress: action.following
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (text: string) => ({ type: ADD_POST, text } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    resetProfileState: () => ({ type: RESET_PROFILE_STATE, initialState } as const),
    setUserStatus: (status: string) => ({ type: SET_USER_STATUS, status } as const),
    like: (id: number) => ({ type: LIKE, id } as const),
    deletePost: (id: number) => ({ type: DELETE_POST, id } as const),
    setProfilePicture: (photos: PhotosType) => ({ type: SET_PROFILE_PICTURE, photos } as const),
    setFollowed: (followed: boolean) => ({ type: SET_FOLLOWED, followed } as const),
    setFollowingInProgress: (following: boolean) => ({ type: SET_FOLLOWING_IN_PROGRESS, following } as const)
};

type DispatchActionsType = ActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, DispatchActionsType>;

export const getUser = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.getUser(userId);
        const followedData = await usersAPI.getFollowed(userId);
        dispatch(actions.setUserProfile(data));
        dispatch(actions.setFollowed(followedData));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.getStatus(userId);
        dispatch(actions.setUserStatus(data));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateProfilePicture = (picture: File): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateProfilePicture(picture);
        if (data.resultCode === 0) {
            dispatch(actions.setProfilePicture(data.data.photos));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateProfileInfo = (profileData: InputsType, setError: any, setEditMode: () => void): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.updateProfileInfo(profileData);
        if (data.resultCode === 0) {
            const userId = getState().auth.id;
            dispatch(getUser(userId as number));
            setEditMode();
        } else {
            setError("server", {
                type: "custom",
                message: data.messages
            })
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(true));
    try {
        await dispatch(usersFollow(userId));
        dispatch(getFriends());
        const followedData = await usersAPI.getFollowed(userId);
        dispatch(actions.setFollowed(followedData));
        dispatch(actions.setFollowingInProgress(false));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setFollowingInProgress(true));
    try {
        await dispatch(usersUnfollow(userId));
        dispatch(getFriends());
        const followedData = await usersAPI.getFollowed(userId);
        dispatch(actions.setFollowed(followedData));
        dispatch(actions.setFollowingInProgress(false));
    } catch (err) {
        dispatch(globalError(err));
    }
};
export default profileReducer;
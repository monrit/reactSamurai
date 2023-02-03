import { profileAPI } from "../api/api";
import { globalError } from "./appReducer";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { InputsType } from "../components/Profile/ProfileInfo/ProfileInfoForm/ProfileInfoForm";
const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const RESET_PROFILE_STATE = "profile/RESET-PROFILE-STATE";
const SET_USER_STATUS = "profile/SET-USER-STATUS";
const DELETE_POST = "profile/DELETE-POST";
const LIKE = "profile/LIKE";
const SET_PROFILE_PICTURE = "profile/SET-PROFILE-PICTURE";


const initialState = {
    posts: [
        { id: 0, message: "First post", likes: 27, liked: false },
        { id: 1, message: "На могилі моїй посадіть молоду яворииинуу", likes: 15, liked: false }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null
};

type InitialStateType = typeof initialState;
type ActionType = AddPostActionType | SetUserProfileActionType | ResetProfileStateActionType | SetUserStatusActionType | LikeActionType | DeletePostActionType | SetProfilePictureActionType;

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
                } as ProfileType //TEMPORARY, NEEDS FIX!!!
            }
        case RESET_PROFILE_STATE: 
            return {
                ...state,
                ...action.initialState
            }
        default:
            return state;
    }
}

export type AddPostActionType = {
    type: typeof ADD_POST,
    text: string
};
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
};
type ResetProfileStateActionType = {
    type: typeof RESET_PROFILE_STATE,
    initialState: InitialStateType
};
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
};
export type LikeActionType = {
    type: typeof LIKE,
    id: number
};
export type DeletePostActionType = {
    type: typeof DELETE_POST,
    id: number
};
type SetProfilePictureActionType = {
    type: typeof SET_PROFILE_PICTURE,
    photos: PhotosType
};
export const addPost = (text: string): AddPostActionType => ({ type: ADD_POST, text });
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
export const resetProfileState = (): ResetProfileStateActionType => ({ type: RESET_PROFILE_STATE, initialState });
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status });
export const like = (id: number): LikeActionType => ({ type: LIKE, id });
export const deletePost = (id: number): DeletePostActionType => ({ type: DELETE_POST, id });
export const setProfilePicture = (photos: PhotosType): SetProfilePictureActionType => ({ type: SET_PROFILE_PICTURE, photos });

export const getUser = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getUser(userId);
        dispatch(setUserProfile(data));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getStatus(userId);
        dispatch(setUserStatus(data));
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateProfilePicture = (picture: File) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateProfilePicture(picture);
        if (data.resultCode === 0) {
            dispatch(setProfilePicture(data.data.photos));
        }
    } catch (err) {
        dispatch(globalError(err));
    }
};

export const updateProfileInfo = (profileData: InputsType, setError: any, setEditMode: any) => async (dispatch: any, getState: any) => {
    try {
        const data = await profileAPI.updateProfileInfo(profileData);
        if (data.resultCode === 0) {
            const userId = getState().auth.id;
            dispatch(getUser(userId));
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

export default profileReducer;
export type PostType = {
    id: number,
    message: string,
    likes: number,
    liked: boolean
};
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
};
export type PhotosType = {
    large: string | null,
    small: string | null
};
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType,
    aboutMe: string
};
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
};
export type ClassNameFuncObjType = {
    isActive: boolean,
    isPending: boolean
};

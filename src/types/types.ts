export type PostType = {
    id: number,
    message: string,
    likes: number,
    liked: boolean
};
export type ContactsType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
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

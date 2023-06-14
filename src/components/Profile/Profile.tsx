import { FC } from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
//import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { InputsType } from "./ProfileInfo/ProfileInfoForm/ProfileInfoForm";

export type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    status: string | null,
    followed: boolean,
    followingInProgress: boolean,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    updateUserStatus: (status: string) => void,
    updateProfilePicture: (picture: File) => void,
    updateProfileInfo: (profileInfo: InputsType, setError: any, setEditModeFalse: () => void) => void
};

const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo {...props}/>
            {props.isOwner && <MyPostsContainer />}
        </div>
    );
};

export default Profile;
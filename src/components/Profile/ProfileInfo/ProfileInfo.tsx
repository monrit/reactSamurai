import Preloader from "../../common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import profilePhoto from "../../../assets/images/profilePicture.jpg";
import { FC, useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm/ProfileInfoForm";
import { PropsType } from "../Profile";
import { ContactsType } from "../../../types/types";


const ProfileInfo: FC<PropsType> = ({ profile, isOwner, status, updateUserStatus, updateProfileInfo, updateProfilePicture }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={style.banner}>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="background" />
            </div>
            <div className={style.description}>
                <img src={profile.photos.large || profilePhoto} alt={profile.fullName + " avatar"} />
                {isOwner && !editMode && <button onClick={() => setEditMode(true)}>Edit profile</button>}
                {editMode ? <ProfileInfoForm updateProfileInfo={updateProfileInfo} updateProfilePicture={updateProfilePicture} setEditMode={setEditMode} profile={profile} /> : <div>
                    <ProfileStatus canEditStatus={isOwner} statusProps={status ? status : ""} updateUserStatus={updateUserStatus} />
                    <div>
                        <b>Full name:</b> {profile.fullName}
                    </div>
                    <div>
                        <b>Job search:</b> {profile.lookingForAJob ? "Looking for a job!" : "Not looking for a job"}
                    </div>
                    {profile.lookingForAJob && <div><b>Job search description:</b> {profile.lookingForAJobDescription}</div>}
                    <div>
                        <b>Bio:</b> {profile.aboutMe}
                    </div>
                    <div>
                        <b>Contacts:</b>
                        {
                            (Object.keys(profile.contacts) as Array<keyof ContactsType>).map(contact =>
                                <div key={contact} className={style.contact}>
                                    <b>{contact}:</b> {profile.contacts[contact]}
                                </div>
                            )
                        }
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ProfileInfo;
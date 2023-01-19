import Preloader from "../../common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import profilePhoto from "../../../assets/images/profilePicture.jpg";
import { useState } from "react";
import ProfileInfoForm from "./ProfileInfoForm/ProfileInfoForm";

function ProfileInfo(props) {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={style.banner}>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="background" />
            </div>
            <div className={style.description}>
                <img src={props.profile.photos.large || profilePhoto} alt={props.profile.fullName + " avatar"} />
                {props.isOwner && !editMode && <button onClick={() => setEditMode(true)}>Edit profile</button>}
                {editMode ? <ProfileInfoForm {...props} setEditMode={setEditMode} /> : <div>
                    <ProfileStatus canEditStatus={props.isOwner} status={props.status} updateUserStatus={props.updateUserStatus} />
                    <div>
                        <b>Full name:</b> {props.profile.fullName}
                    </div>
                    <div>
                        <b>Job search:</b> {props.profile.lookingForAJob ? "Looking for a job!" : "Not looking for a job"}
                    </div>
                    {props.profile.lookingForAJob && <div><b>Job search description:</b> {props.profile.lookingForAJobDescription}</div>}
                    <div>
                        <b>Bio:</b> {props.profile.aboutMe}
                    </div>
                    <div>
                        <b>Contacts:</b> {Object.keys(props.profile.contacts).map(contact => <div key={contact} className={style.contact}><b>{contact}:</b> {props.profile.contacts[contact]}</div>)}
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default ProfileInfo;
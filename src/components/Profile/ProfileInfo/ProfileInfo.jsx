import Preloader from "../../common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }

    return (
        <div>
            <div className={style.banner}>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="background"/>
            </div>
            <div className={style.description}>
                <img src={props.profile.photos.large} alt={props.profile.fullName + " avatar"}/>
                <div>{props.profile.fullName}</div>
                <div>Job search: {props.profile.lookingForAJob ? <span>{props.profile.lookingForAJobDescription}</span>: <span>Not looking for a job</span>}</div>
                <div>ABOUT ME: {props.profile.aboutMe}</div>
                <div>GITHUB: {props.profile.contacts.github}</div>
            </div>
        </div>
    );
}

export default ProfileInfo;
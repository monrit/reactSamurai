import style from "./ProfileInfo.module.css";

function ProfileInfo(props) {
    return (
        <div>
            <div>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="background" width="600" />
            </div>
            <div className={style.description}>
                ava + desc
            </div>
        </div>
    );
}

export default ProfileInfo;
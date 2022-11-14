import MyPosts from "./MyPosts/MyPosts";
import style from "./Profile.module.css";

function Profile() {
    return (
        <div>
            <div>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="background" width="600" />
            </div>
            <div>
                ava + desc
            </div>
            <MyPosts />
        </div>
    );
}

export default Profile;
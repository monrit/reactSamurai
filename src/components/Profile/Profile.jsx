import MyPostsContainer from "./MyPosts/MyPostsContainer";
//import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
import MyPosts from "./MyPosts/MyPosts";
//import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div>
            <ProfileInfo />
            <MyPosts state={props.state} dispatch={props.dispatch}/>
        </div>
    );
}

export default Profile;
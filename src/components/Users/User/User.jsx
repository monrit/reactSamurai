import style from "./User.module.css";
import profilePicture from "../../../assets/images/profilePicture.jpg";
import { NavLink } from "react-router-dom";


function User({user, follow, unfollow, followingInProgress}) {
    return (
        <div className={style.userFrame}>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small || profilePicture} alt={user.name} className={style.image} width="50" height="50" />
                </NavLink>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>UNFOLLOW</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>FOLLOW</button>}
            </div>
            <div>
                <div>
                    {user.name}
                </div>
                <div>
                    STATUS: {user.status}
                </div>
            </div>
        </div>
    );
}

export default User;
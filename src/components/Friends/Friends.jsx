import { NavLink } from "react-router-dom";
import Friend from "./Friend/Friend";
import style from "./Friends.module.css";

function Friends(props) {
    let friends = props.friends.map(friend => <Friend avatar={friend.avatar} username={friend.username} />);
    const selectedLink = navData => style.friend + " " + (navData.isActive ? style.active : null);
    return (
        <div className={style.friends}>
            <NavLink to="/friends" className={selectedLink}>Friends</NavLink>
            <div className={style.wrapper}>
                { friends }
                тест
            </div>
        </div>
    );
}

export default Friends;
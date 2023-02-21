import { FC } from "react";
import style from "./Friend.module.css";
import profilePicture from "../../../../assets/images/profilePicture.jpg";
import { NavLink } from "react-router-dom";

type PropsType = {
    avatar: string | null,
    username: string,
    id: number
};

const Friend: FC<PropsType> = ({ avatar, username, id }) => {
    return (
        <div className={style.person}>
            <div className={style.avatar}>
                <NavLink to={`profile/${id}`}>
                    <img src={avatar ? avatar: profilePicture} alt="avatar" />
                </NavLink>
            </div>
            <div className={style.username}>
                <span>{username}</span>
            </div>
        </div>
    );
};

export default Friend;

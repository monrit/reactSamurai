import { FC } from "react";
import style from "./Friend.module.css";

type PropsType = {
    avatar: string,
    username: string
};

const Friend: FC<PropsType> = ({ avatar, username }) => {
    return (
        <div className={style.person}>
            <div className={style.avatar}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={style.username}>
                <span>{username}</span>
            </div>
        </div>
    );
};

export default Friend;

import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { InitialStateType } from "../../../redux/sidebarReducer";
import { ClassNameFuncObjType } from "../../../types/types";
import Friend from "./Friend/Friend";
import style from "./Friends.module.css";
import { FC } from "react";

type PropsType = InitialStateType;

const Friends: FC<PropsType> = ({ friends }) => {
    const selectedLink = (navData: ClassNameFuncObjType) => classNames({
        [style.friend]: true,
        [style.active]: navData.isActive
    });

    const friendsElements = friends.map(friend => <Friend key={friend.id} avatar={friend.avatar} username={friend.username} />);
    
    return (
        <div className={style.friends}>
            <NavLink to="/friends" className={selectedLink}>Friends</NavLink>
            <div className={style.wrapper}>
                {friendsElements}
            </div>
        </div>
    );
};

export default Friends;
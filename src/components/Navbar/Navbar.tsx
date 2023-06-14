import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { InitialStateType } from "../../redux/sidebarReducer";
import { FC } from "react";
import { ClassNameFuncObjType } from "../../types/types";
import classNames from "classnames";
import Friends from "./NavbarFriends/NavbarFriends";

type PropsType = InitialStateType;

const Navbar: FC<PropsType> = ({ friends }) => {
    const selectedLink = (navData: ClassNameFuncObjType) => classNames({
        [style.item]: true,
        [style.active]: navData.isActive
    });
    
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to="/profile" className={selectedLink}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/messages" className={selectedLink}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={selectedLink}>News</NavLink>
            </div>
            <div>
                <NavLink to="/music" className={selectedLink}>Music</NavLink>
            </div>
            <div>
                <NavLink to="/settings" className={selectedLink}>Settings</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={selectedLink}>Users</NavLink>
            </div>
            <div>
                <Friends friends={friends} />
            </div>
        </nav>
    );
};

export default Navbar;
import classNames from "classnames";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { ClassNameFuncObjType } from "../../../types/types";
import style from "./DialogItem.module.css";

type PropsType = {
    id: number,
    name: string
};
const DialogItem: FC<PropsType> = ({ id, name }) => {
    const selectedLink = (navData: ClassNameFuncObjType): string => classNames({
        [style.item]: true,
        [style.active]: navData.isActive
    });
    
    return (
        <div>
            <NavLink to={"/messages/" + id} className={selectedLink}>{name}</NavLink>
        </div>
    );
};

export default DialogItem;
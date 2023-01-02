import { NavLink } from "react-router-dom";
import style from "./DialogItem.module.css";

function DialogItem(props) {
    const selectedLink = navData => style.item + " " + (navData.isActive ? style.active: null); 
    return (
        <div>
            <NavLink to={"/messages/" + props.id} className={selectedLink}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;
import { NavLink } from "react-router-dom";
import style from "./Messages.module.css";

function Messages() {
    const selectedLink = navData => style.item + " " + (navData.isActive ? style.active: null); 
    return (
        <div className={style.dialogs}>
            <div className={style.messagesItems}>
                <div className={style.item + " " + style.active}>
                    <NavLink to="/messages/1" className={selectedLink}>Asya</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/messages/2" className={selectedLink}>Dima</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/messages/3" className={selectedLink}>Petya</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/messages/4" className={selectedLink}>Ostap</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/messages/5" className={selectedLink}>Andrew</NavLink>
                </div>
            </div>
            <div className={style.messages}>
                <div className={style.message}>Balls</div>
                <div className={style.message}>Chornovil</div>
                <div className={style.message}>Stus</div>
            </div>
        </div>
    );
}

export default Messages;
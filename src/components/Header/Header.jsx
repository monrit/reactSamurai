import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

function Header(props) {
    return (
        <header className={style.header}>
            <img src="https://i.pinimg.com/originals/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" alt="wallpaper" />
            <div className={style.loginContainer}>
                {props.isAuth ? <span>{props.login} - <button onClick={props.logout}>Log Out</button></span>: <NavLink to="/login" className={style.login}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;
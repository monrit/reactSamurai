import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Friends from "../Friends/Friends";

function Navbar(props) {
    const selectedLink = navData => style.item + " " + (navData.isActive ? style.active : null);
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
                <Friends friends={props.state.friends}/>
            </div>
        </nav>
    );
}

export default Navbar;
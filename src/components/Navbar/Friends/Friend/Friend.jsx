import style from "./Friend.module.css";

function Friend(props) {
    return (
        <div className={style.person}>
            <div className={style.avatar}>
                <img src={props.avatar} alt="avatar" />
            </div>
            <div className={style.username}>
                <span>{props.username}</span>
            </div>
        </div>
    );
}

export default Friend;

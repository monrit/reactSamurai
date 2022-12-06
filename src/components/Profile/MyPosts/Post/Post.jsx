import style from "./Post.module.css";

function Post(props) {
    return (
        <div className={style.item}>
            <img alt="avatar" src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg" />
            <div className={style.wrap}>
                <span>Котик</span>
                <span>{props.message}</span>
            </div>
            <div className={style.likes}>
                <span>Num of likes: {props.likes}</span>
            </div>
        </div>
    );
}

export default Post;
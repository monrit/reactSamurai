import style from "./Post.module.css";
import CloseIcon from "@mui/icons-material/Close";
import profilePicture from "../../../../assets/images/profilePicture.jpg";
import { FC } from "react";

type PropsType = {
    profileAvatar: string | null | undefined,
    userName: string | null,
    message: string,
    deletePost: (id: number) => void,
    id: number,
    likes: number,
    like: (id: number) => void
};

const Post: FC<PropsType> = ({ profileAvatar, userName, message, deletePost, id, likes, like }) => {
    return (
        <div className={style.item}>
            <img alt="avatar" src={profileAvatar ?? profilePicture} />
            <div className={style.wrap}>
                <span>{userName}</span>
                <span>{message}</span>
            </div>
                <CloseIcon onClick={() => deletePost(id)}/>
            <div className={style.likes}>
                <span>Num of likes: {likes} </span>
                <button onClick={() => like(id)}>Like</button>
            </div>
        </div>
    );
};

export default Post;
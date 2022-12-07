import style from "./Users.module.css";
import profilePicture from "../../assets/images/profilePicture.jpg";
import Preloader from "../common/Preloader/Preloader";

function Users(props) {

    const numOfPages = Math.ceil(props.totalUsers / props.pageSize);

    const buttons = [];

    for (let i = 1; i <= numOfPages; i++) {
        buttons.push(i);
    }

    return (
        <div>
            {buttons.map(page => {
                return (
                    <span key={page} onClick={() => props.onPageChange(page)} className={props.currentPage === page ? style.selected : undefined}>{page}</span>
                );
            })}
            {props.isFetching ? <Preloader />: props.users.map(user => {
                return (
                    <div key={user.id} className={style.userFrame}>
                        <div>
                            <img src={user.photos.small || profilePicture} alt={user.name} className={style.image} width="50" height="50" />
                            {user.followed
                                ? <button onClick={() => props.unfollow(user.id)}>UNFOLLOW</button>
                                : <button onClick={() => props.follow(user.id)}>FOLLOW</button>}
                        </div>
                        <div>
                            <div>
                                {user.name}
                            </div>
                            <div>
                                STATUS: {user.status}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Users;
import style from "./Users.module.css";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

function Users({onPageChange, currentPage, totalUsers, pageSize, isFetching, users, followingInProgress, follow, unfollow}) {
    return (
        <div>
            <Paginator onPageChange={onPageChange} currentPage={currentPage} totalItems={totalUsers} pageSize={pageSize} />
            {isFetching ? <Preloader /> : users.map(user => {
                return (
                    <User key={user.id} user={user} follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}/>
                );
            })}
        </div>
    );
}

export default Users;
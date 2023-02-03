import style from "./Users.module.css";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import { FC } from "react";
import { UserType } from "../../types/types";

type PropsType = {
    onPageChange: (currentPage: number) => void,
    currentPage: number,
    totalUsers: number,
    pageSize: number,
    isFetching: boolean,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};

const Users: FC<PropsType> = ({onPageChange, currentPage, totalUsers, pageSize, isFetching, users, followingInProgress, follow, unfollow}) => {
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
};

export default Users;
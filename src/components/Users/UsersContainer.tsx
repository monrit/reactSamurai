import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPageSelector, getFollowingInProgressSelector, getIsAuthSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersSelector, getUsersSelector } from "../../redux/usersSelectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type MapStateType = {
    users: Array<UserType>,
    currentPage: number,
    totalUsers: number,
    pageSize: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    isAuth: boolean
};
type DispathStateToPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void
};

type UsersContainerType = MapStateType & DispathStateToPropsType;

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChange = (currentPage: number) => {
        const { pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    follow = (userId: number) => {
        this.props.follow(userId);
    };

    unfollow = (userId: number) => {
        this.props.unfollow(userId);
    };

    render() {
        return (
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                follow={this.follow}
                unfollow={this.unfollow}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress} />
        );
    };
}

function mapStateToProps(state: AppStateType): MapStateType {
    return {
        users: getUsersSelector(state),
        currentPage: getCurrentPageSelector(state),
        totalUsers: getTotalUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isAuth: getIsAuthSelector(state)
    };
}

export default compose(
    connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mapStateToProps, { follow, unfollow, getUsers }),
    withAuthRedirect
)(UsersContainer);
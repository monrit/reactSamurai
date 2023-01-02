import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPageSelector, getFollowingInProgressSelector, getIsAuthSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersSelector, getUsersSelector } from "../../redux/usersSelectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (currentPage) => {
        this.props.getUsers(currentPage, this.props.pageSize);
    };

    follow = (userId) => {
        this.props.follow(userId);
    };

    unfollow = (userId) => {
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

function mapStateToProps(state) {
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

const mapDispatchToProps = {
    follow,
    unfollow,
    getUsers
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);
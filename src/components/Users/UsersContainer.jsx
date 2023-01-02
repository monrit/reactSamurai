import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth
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
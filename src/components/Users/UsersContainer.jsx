import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, setCurrentPage, setIsFetching, setTotalUsers, setUsers, unfollow } from "../../redux/usersReducer";
import { usersAPI } from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items);
                this.props.setIsFetching(false);
                //4400+ pages will apear !!NEEDS SOLUTION
                //this.props.setTotalUsers(data.totalCount);
            });
    }

    onPageChange = (currentPage) => {
        this.props.setIsFetching(true);
        usersAPI.getUsers(currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items);
            });
        this.props.setCurrentPage(currentPage);
    };

    render() {
        return (
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isFetching={this.props.isFetching} />
        );
    };
}

function mapStateToProps(state) {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching
    };
}

const mapDispatchToProps = {
    follow,
    unfollow,
    setCurrentPage,
    setIsFetching,
    setTotalUsers,
    setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
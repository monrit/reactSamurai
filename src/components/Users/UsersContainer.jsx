import { connect } from "react-redux";
import { followAC, setCurrentPageAC, setTotalUsersAC, setUsersAC, unfollowAC } from "../../redux/usersReducer";
import Users from "./Users";

function mapStateToProps(state) {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize
    };
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (userId) => {
            dispatch( followAC(userId) );
        },
        unfollow: (userId) => {
            dispatch( unfollowAC(userId) );
        },
        setUsers: (users) => {
            dispatch( setUsersAC(users) );
        },
        setCurrentPage: (page) => {
            dispatch( setCurrentPageAC(page) );
        },
        setTotalUsers: (totalUsers) => {
            dispatch( setTotalUsersAC(totalUsers) );
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
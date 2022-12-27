import React from "react";
import { connect } from "react-redux";
import { getUser, getUserStatus, updateUserStatus } from "../../redux/profileReducer";
import Profile from "./Profile";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2
        }
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        id: state.auth.id,
        status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getUserStatus, updateUserStatus }),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);

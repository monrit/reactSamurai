import React from "react";
import { connect } from "react-redux";
import { getUser, getUserStatus, updateUserStatus } from "../../redux/profileReducer";
import Profile from "./Profile";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.id;
        if (!userId) {
            return;
        }
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus} />
        );
    }
}

function mapStateToProps(state) {
    return {
        profileId: state.profilePage.profileId,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.auth.id
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getUserStatus, updateUserStatus }),
    withRouter
)(ProfileContainer);

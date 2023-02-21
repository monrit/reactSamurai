import React from "react";
import { connect } from "react-redux";
import { getUser, getUserStatus, updateUserStatus, updateProfilePicture, updateProfileInfo, follow, unfollow } from "../../redux/profileReducer";
import Profile from "./Profile";
import { withRouter } from "../../hoc/withRouter";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { ProfileType } from "../../types/types";
import { InputsType } from "./ProfileInfo/ProfileInfoForm/ProfileInfoForm";

type MapStateType = {
    profile: ProfileType | null,
    status: string | null,
    id: number | null,
    followed: boolean,
    followingInProgress: boolean,
    router?: any
};
type DispathStateToPropsType = {
    getUser: (userId: number) => void,
    getUserStatus: (userId: number) => void,
    updateUserStatus: (status: string) => void,
    updateProfilePicture: (picture: File) => void,
    updateProfileInfo: (profileData: InputsType, setError: any, setEditModeFalse: () => void) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};
type PropsType = MapStateType & DispathStateToPropsType;

class ProfileContainer extends React.Component<PropsType> {
    getProfile() {
        let userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.id;
        if (!userId) {
            return;
        }
        this.props.getUser(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.getProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.getProfile();
        }
    }

    render() {
        let userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.id;

        return (
            <Profile
                updateProfilePicture={this.props.updateProfilePicture}
                isOwner={userId === this.props.id}
                profile={this.props.profile}
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus}
                updateProfileInfo={this.props.updateProfileInfo}
                followed={this.props.followed}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        );
    }
}

function mapStateToProps(state: AppStateType): MapStateType {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.auth.id,
        followed: state.profilePage.followed,
        followingInProgress: state.profilePage.followingInProgress
    }
}

export default compose(
    connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mapStateToProps, { getUser, getUserStatus, updateUserStatus, updateProfilePicture, updateProfileInfo, follow, unfollow }),
    withRouter
)(ProfileContainer);

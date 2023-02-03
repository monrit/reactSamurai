import React from "react";
import { connect } from "react-redux";
import { getUser, getUserStatus, updateUserStatus, updateProfilePicture, updateProfileInfo } from "../../redux/profileReducer";
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
    router?: any
};
type DispathStateToPropsType = {
    getUser: (id: number) => void,
    getUserStatus: (id: number) => void,
    updateUserStatus: (text: string) => void,
    updateProfilePicture: (photo: File) => void,
    updateProfileInfo: (profileInfo: InputsType) => void 
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
            />
        );
    }
}

function mapStateToProps(state: AppStateType): MapStateType {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.auth.id
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getUserStatus, updateUserStatus, updateProfilePicture, updateProfileInfo }),
    withRouter
)(ProfileContainer);

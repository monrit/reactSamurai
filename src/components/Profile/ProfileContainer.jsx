import React from "react";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";
import Profile from "./Profile";
import { profileAPI } from "../../api/api";
//withRouter analog! v6 router-dom uses hooks
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
//withRouter analog! v6 router-dom uses hooks


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }
        profileAPI.getUser(userId)
            .then(data => {
                this.props.setUserProfile(data);
            });
    }

    render() {
        return (
            <Profile profile={this.props.profile} />
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));
import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/profileReducer";
import Profile from "./Profile";
//withRouter analog! v6 router-dom uses hooks
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

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
            const interval = setInterval(() => {
                if (this.props.id) {
                    userId = this.props.id;
                    clearInterval(interval);
                    this.props.getUser(userId);
                }
            }, 100);
        } else {
            this.props.getUser(userId);
        }
    }

    render() {
        return (
            <Profile profile={this.props.profile} />
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        id: state.auth.id
    }
}

export default withAuthRedirect( connect(mapStateToProps, { getUser })(withRouter(ProfileContainer)) );
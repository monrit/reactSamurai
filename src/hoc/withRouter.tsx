//withRouter analog! v6 router-dom uses hooks
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
export function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
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
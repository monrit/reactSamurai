import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";

function Login(props) {

    if (props.isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <LoginForm {...props}/>
    );
}

export default Login;
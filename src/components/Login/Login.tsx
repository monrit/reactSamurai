import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { FC } from "react";
type PropsType = {
    login: (email: string, password: string, rememberMe: boolean, setError: any, captcha?: string | null) => void,
    captchaUrl: string | null,
    isAuth: boolean
}

const Login: FC<PropsType> = (props) => {

    if (props.isAuth) {
        return <Navigate to="/profile" />
    }

    return (
        <>
            <LoginForm {...props} />
        </>
    );
}

export default Login;
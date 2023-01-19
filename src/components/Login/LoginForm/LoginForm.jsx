import { useForm } from "react-hook-form";
import style from "./LoginForm.module.css";

function LoginForm(props) {
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        clearErrors,
        setError,
        reset,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        props.login(data.email, data.password, data.rememberMe, setError, data.captcha);
        reset({
            email: "",
            password: "",
            rememberMe: false
        }, { keepErrors: true });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <label>Email:
                        <br />
                        <input
                            {...register("email", {
                                required: "This field is requiered.",
                                minLength: {
                                    value: 5,
                                    message: "Your login must be at least 5 symbols long."
                                }
                            })}
                            onFocus={() => clearErrors(["email", "server"])}
                            placeholder="Email"
                        />
                        <div className={style.errorMessage}>
                            {errors.email && <span>{errors.email?.message || "Error!"}</span>}
                        </div>
                    </label>
                </div>
            </div>
            <div>
                <label>Password:
                    <br />
                    <input
                        type="password"
                        {...register("password", {
                            required: "This field is requiered."
                        })}
                        onFocus={() => clearErrors(["password", "server"])}
                        placeholder="Password"
                    />
                    <div className={style.errorMessage}>
                        {errors.password && <span>{errors.password.message || "Error!"}</span>}
                    </div>
                </label>
            </div>
            {props.captchaUrl &&
                <div>
                    <img src={props.captchaUrl} alt="captcha"/>
                    <input {...register("captcha", {
                        required: true,
                        minLength: 1
                    })} />
                </div>
            }
            <div>
                <label>
                    <input
                        type="checkbox"
                        {...register("rememberMe")}
                    />Remember me
                </label>
            </div>
            {errors.server
                &&
                <div className={style.errorMessage}>
                    <span>{errors.server.message}</span>
                </div>}
            <input className={style.button} type="submit" disabled={!isValid} value="Log in" />
        </form>
    );
}

export default LoginForm;
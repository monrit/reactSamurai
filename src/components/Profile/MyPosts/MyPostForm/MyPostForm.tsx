import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type PropsType = {
    addPost: (text: string) => void
};
type InputsTypes = {
    myPostText: string
};

const MyPostForm: FC<PropsType> = ({ addPost }) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<InputsTypes>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<InputsTypes> = (data) => {
        addPost(data.myPostText.trim());
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("myPostText", {
                    required: true,
                    minLength: 1,
                    validate: value => value.trim() !== ""
                })}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    );
};

export default MyPostForm;
import { FC, KeyboardEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type PropsType = {
    addPost: (text: string) => void
};
type InputsTypes = {
    myPostText: string,
    sendOnShiftPlusEnter: boolean
};

const MyPostForm: FC<PropsType> = ({ addPost }) => {
    const {
        register,
        handleSubmit,
        reset,
        getValues
    } = useForm<InputsTypes>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<InputsTypes> = (data) => {
        addPost(data.myPostText.trim());
        reset({
            myPostText: ""
        });
    };

    const onEnterSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && (getValues("sendOnShiftPlusEnter") ? e.shiftKey === true: e.shiftKey !== true)) {
            e.preventDefault();
            (handleSubmit(onSubmit))();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={onEnterSubmit}>
            <div>
                <textarea {
                    ...register("myPostText", {
                        required: true,
                        minLength: 1,
                        validate: value => value.trim() !== ""
                    })}
                    placeholder="Tell people about your day..."
                />
            </div>
            <div>
                <button type="submit">add post</button>
                <label>
                    <input
                        {...register("sendOnShiftPlusEnter")}
                        type="checkbox"
                    />
                    Shift + Enter to send
                </label>
            </div>
        </form>
    );
};

export default MyPostForm;
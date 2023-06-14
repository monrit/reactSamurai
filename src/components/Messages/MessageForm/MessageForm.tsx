import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";

type PropsType = {
    addMessage: (text: string) => void
};
type InputTypes = {
    messageText: string
};

const MessageForm: FC<PropsType> = ({ addMessage }) => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<InputTypes>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<InputTypes> = (data) => {
        addMessage(data.messageText.trim());
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register("messageText", {
                    required: true,
                    minLength: 1,
                    validate: value => value.trim() !== ""
                })}
                />
                <button>Send</button>
            </form>
        </>
    );
}

export default MessageForm;
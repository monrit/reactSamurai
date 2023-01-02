import { useForm } from "react-hook-form";


function MessageForm(props) {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        props.addMessage(data.messageText.trim());
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
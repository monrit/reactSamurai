import { useForm } from "react-hook-form";

function MyPostForm(props) {

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        props.addPost(data.myPostText.trim());
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
}

export default MyPostForm;
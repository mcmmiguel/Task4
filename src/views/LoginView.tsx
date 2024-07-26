import { useForm } from "react-hook-form"

export type LoginForm = {
    email: string;
    password: string;
}

const LoginView = () => {

    const initialValues: LoginForm = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>({ defaultValues: initialValues });

    const handleLogin = (formData: LoginForm) => {
        console.log(formData);
        reset();
    }

    return (
        <div className="container w-50">
            <h1 className="text-center">Task4</h1>
            <hr />
            <h2 className="mt-10">Sign In</h2>
            <form
                className="d-flex flex-column align-center needs-validation"
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="johndoe@gmail.com"
                        {...register("email", {
                            required: "The email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        {...register('password', {
                            minLength: 8,
                            required: 'Invalid password'
                        })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>


                <button className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}
export default LoginView
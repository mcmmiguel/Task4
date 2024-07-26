import { useForm } from "react-hook-form";
import { registerAccount } from "../api/authAPI";

export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const RegisterView = () => {

    const initialValues: RegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: initialValues });

    const password = watch('password');

    const handleLogin = async (formData: RegisterForm) => {
        await registerAccount(formData);
    }

    return (
        <div className="container w-50">
            <h1 className="text-center">Task4</h1>
            <hr />
            <h2 className="mt-10">Register account</h2>
            <form
                className="d-flex flex-column align-center needs-validation"
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        placeholder="John Doe"
                        {...register('name', {
                            required: 'The name is required',
                        })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
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
                            required: 'Password must have at least 8 characters long'
                        })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Confirm your password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                        {...register('password_confirmation', {
                            validate: value => value === password || 'Passwords do not match',
                            required: 'Please confirm your password'
                        })}
                    />
                    {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation.message}</div>}
                </div>

                <button className="btn btn-primary">Create account</button>
            </form>
        </div>
    )
}
export default RegisterView
import { useForm } from "react-hook-form"
import { authenticateUser } from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormMessage from "../components/FormMessage";

export type LoginForm = {
    email: string;
    password: string;
}

const LoginView = () => {

    const initialValues: LoginForm = {
        email: '',
        password: '',
    }

    const [errorAPI, setErrorAPI] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>({ defaultValues: initialValues });

    const navigate = useNavigate();

    const handleLogin = async (formData: LoginForm) => {
        setIsLoading(true);
        try {
            await authenticateUser(formData);
            reset();
            navigate('/');
        } catch (error) {
            if (error instanceof Error) {
                setErrorAPI(error.message);
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => setErrorAPI(null), 5000);
        }
    }

    return (
        <div className="container w-50">
            <h1 className="text-center">Task4</h1>
            <hr />
            <h2 className="mt-10">Sign In</h2>
            {errorAPI && <FormMessage type="error">{errorAPI}</FormMessage>}
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
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must have at least 8 characters long'
                            },
                        })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>


                <button className="btn btn-primary">{isLoading ? 'Signing in...' : 'Sign In'}</button>
            </form>

            <p className="text-center" style={{ marginTop: 20 }}>You don't have an account? <Link to={'/auth/register'} className="">Sign up</Link></p>

        </div>
    )
}
export default LoginView
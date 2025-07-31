import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginUserType, LoginUserSchema } from "@/interfaces/LoginUser";
import { useNavigate } from "react-router";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { API } from "../App"; // Importar la constante API desde App.tsx


function Login() {
    localStorage.removeItem("token"); // Limpiar el token al iniciar sesión
    // Hook para navegación
    const navigate = useNavigate();
    const form = useForm<LoginUserType>({
        mode: "onBlur",
        resolver: zodResolver(LoginUserSchema),
        defaultValues: {
            userLogin: "",
            userPassword: "",
        },
    });

    async function submitForm(data: LoginUserType) {
        const response = await fetch(`${API}users/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": data.userLogin,
                "password": data.userPassword,
            }),
        });

        if (!response.ok) {
            alert("Login failed");
            console.error("Login failed");
            return;
        }
        alert("Login successful");
        const result = await response.json();
        // console.log(result);
        localStorage.setItem("token", result.access);
        // console.log("Token stored in localStorage:", localStorage.getItem("token"));
        navigate('/register'); // Redirigir a la página de registro
    }
    // Función para ir al registro
    const goToRegister = () => {
        navigate('/register');
    }
    return (
        <>
            <div className="flex flex-col gap-1 sm:px-8 lg:shadow-2xl p-5 rounded bg-white">
            <div className="flex justify-center items-center">
                <h2 className="text-2xl font-bold mb-2">Login</h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}>
                    <InputWithLabel
                        type="text"
                        fieldTittle="Username"
                        nameInSchema="userLogin"
                        className="mb-7"
                    />
                    <InputWithLabel
                        type="password"
                        fieldTittle="Password"
                        nameInSchema="userPassword"
                        className="mb-7"
                    />
                    <Button
                        type="submit"
                        className="hover:bg-primaryBlue  mt-7 ease-in-out duration-500"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
            {/* Botón para ir al registro */}
            <Button type="button"
                    className="hover:bg-primaryBlue  mt-7 ease-in-out duration-500"
                    onClick={goToRegister}>
                ¿No tienes cuenta? Regístrate
            </Button>
            </div>
        </>
    )
}

export default Login;
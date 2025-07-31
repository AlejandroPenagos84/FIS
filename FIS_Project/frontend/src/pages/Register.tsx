import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { RegisterUserSchema, type RegisterUserType } from "@/interfaces/RegisterUser";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
// import { useEffect , useState} from 'react'
// import { useNavigate } from 'react-router-dom';
import { API } from "../App"; // Importar la constante API desde App.tsx
import { useTokenValidation } from "@/hooks/useTokenValidation";


function Register() {
        const { checkTokenExpiration, timeRemaining, formatTime, getTimeColor, isTokenValid } = useTokenValidation();
    // console.log(localStorage.getItem("token"));
    const data = [
        {
            id: "Administrador",
            description: "Administrador",
        },
        {
            id: "Ingeniero",
            description: "Ingeniero",
        },
        {
            id: "Supervisor_Cliente",
            description: "Supervisor Cliente",
        },
    ];
    const form = useForm<RegisterUserType>({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema),
        defaultValues: {
            firstName: "",
            secondName: "",
            firstLastName: "",
            secondLastName: "",
            username: "",
            password: "",
            role: "",
        },
    });

    async function submitForm(data: RegisterUserType) {
        // Verificar token antes de hacer la petición
        if (!checkTokenExpiration()) {
            return;
        }
        // const token = localStorage.getItem('token');
        console.log(data);
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${API}users/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    primer_nombre: data.firstName,
                    segundo_nombre: data.secondName,
                    primer_apellido: data.firstLastName,
                    segundo_apellido: data.secondLastName,
                    rol: data.role,
                    email: `${data.username}@example.com` // Agregar email si es requerido
                }),
            });

            if (response.status === 401) {
                // Token expirado
                localStorage.removeItem('token');
                alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error('Error al crear usuario');
            }

            const result = await response.json();
            alert('Usuario creado exitosamente');
            console.log(result);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear usuario');
        }
    }

    if (!isTokenValid) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600">Sesión Expirada</h2>
                    <p>Redirigiendo al login...</p>
                </div>
            </div>
        )
    }
    
    return (
        <>
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-3 border z-50">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                        Sesión expira en:
                    </span>
                    <span className={`text-lg font-bold ${getTimeColor()}`}>
                        {formatTime(timeRemaining)}
                    </span>
                </div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                            timeRemaining > 120 ? 'bg-green-500' : 
                            timeRemaining > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                            width: `${Math.min(100, (timeRemaining / 300) * 100)}%` // Asumiendo 5 minutos máximo
                        }}
                    ></div>
                </div>
                
                {/* Alerta crítica */}
                {timeRemaining <= 30 && (
                    <div className="text-xs text-red-600 mt-1 animate-pulse font-bold">
                        ⚠️ SESIÓN EXPIRANDO PRONTO
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1 sm:px-8 lg:shadow-2xl p-5 rounded bg-white">
                <div className="flex justify-center items-center">
                    <h2 className="text-2xl font-bold mb-2">Registro</h2>
                </div>
                <div className={`border rounded p-3 mb-4 ${
                    timeRemaining > 120 ? 'bg-green-50 border-green-200' : 
                    timeRemaining > 60 ? 'bg-yellow-50 border-yellow-200' : 
                    'bg-red-50 border-red-200'
                }`}>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Tiempo de sesión restante:
                        </span>
                        <div className="flex items-center gap-2">
                            <span className={`font-bold text-lg ${getTimeColor()}`}>
                                {formatTime(timeRemaining)}
                            </span>
                            {timeRemaining <= 60 && (
                                <span className="text-red-500 animate-pulse">⚠️</span>
                            )}
                        </div>
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submitForm)}>
                        <InputWithLabel
                            type="text"
                            fieldTittle="Primer Nombre"
                            nameInSchema="firstName"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Segundo Nombre"
                            nameInSchema="secondName"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Primer Apellido"
                            nameInSchema="firstLastName"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Segundo Apellido"
                            nameInSchema="secondLastName"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Username"
                            nameInSchema="username"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="password"
                            fieldTittle="Password"
                            nameInSchema="password"
                            className="mb-7"
                        />
                        <SelectWithLabel
                            fieldTittle="Rol"
                            nameInSchema="role"
                            data={data}
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
            </div>
        </>
    )
}

export default Register;
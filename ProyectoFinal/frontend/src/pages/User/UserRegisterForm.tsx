import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
    RegisterUserSchema,
    type RegisterUserType,
} from "@/interfaces/RegisterUser";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, postUser, updateUser } from "@/api/User";
import type { User } from "@/interfaces/User";

function UserRegisterForm() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>();

    const form = useForm<RegisterUserType>({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema(!!userId)),
        defaultValues: {
            identification: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            role: "",
            phone: "",
            email:""
        },
    });

    async function submitForm(data: RegisterUserType) {
        if (userId) {
            const updated = await updateUser(userId, data);
            if (updated) {
                alert("Usuario actualizado correctamente");
            }
        } else {
            const updated = await postUser(data);
            if (updated) {
                alert("Usuario agregado correctamente");
            }
        }
    }

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const data = await getUser(userId);
                console.log(data);
                if (data) {
                    setUser(data);

                    // Rellenar formulario con los datos del usuario
                    form.reset({
                        identification: data.identification ?? "",
                        first_name: data.first_name  ?? "",
                        last_name: data.last_name  ?? "",
                        username: data.username  ?? "",
                        role: data.role  ?? "",
                        phone: data.phone ?? "",
                        email: data.email  ?? ""
                    });
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUser();
    }, [userId, form]);


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

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col gap-1 sm:px-8 lg:shadow-2xl p-5 rounded bg-white">
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl font-bold mb-2">Registro</h2>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitForm)}>
                            <InputWithLabel
                                type="number"
                                fieldTittle="Identificacion"
                                nameInSchema="identification"
                                className="mb-7"
                            />
                            <InputWithLabel
                                type="text"
                                fieldTittle="Nombre"
                                nameInSchema="first_name"
                                className="mb-7"
                            />
                            <InputWithLabel
                                type="text"
                                fieldTittle="Apellido"
                                nameInSchema="last_name"
                                className="mb-7"
                            />
                            <InputWithLabel
                                type="text"
                                fieldTittle="Username"
                                nameInSchema="username"
                                className="mb-7"
                            />
                            {userId === undefined &&
                                <InputWithLabel
                                    type="password"
                                    fieldTittle="Password"
                                    nameInSchema="password"
                                    className="mb-7"
                                />
                            }
                            <InputWithLabel
                                type="text"
                                fieldTittle="Phone"
                                nameInSchema="phone"
                                className="mb-7"
                            />
                            <InputWithLabel
                                type="text"
                                fieldTittle="Email"
                                nameInSchema="email"
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
                                className="hover:bg-primaryBlue mt-7 ease-in-out duration-500"
                            >
                                {userId === undefined ? "Agregar" : "Actualizar"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default UserRegisterForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginUserType, LoginUserSchema } from "@/interfaces/LoginUser";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";


function Login() {
    const form = useForm<LoginUserType>({
        mode: "onBlur",
        resolver: zodResolver(LoginUserSchema),
        defaultValues: {
            userLogin: "",
            userPassword: "",
        },
    });

    async function submitForm(data: LoginUserType) {
        console.log(data);
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
            </div>
        </>
    )
}

export default Login;
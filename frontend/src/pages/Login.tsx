import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginUserType, LoginUserSchema } from "@/interfaces/LoginUser";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const form = useForm<LoginUserType>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      userLogin: "",
      userPassword: "",
    },
  });

  async function submitForm(data: LoginUserType) {
    await login(data);
    navigate("/home");
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-1 sm:px-8 lg:shadow-2xl p-5 rounded bg-white items-center justify-center">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
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
              className="hover:bg-primaryBlue  mt-7 ease-in-out duration-500 bg-green"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;

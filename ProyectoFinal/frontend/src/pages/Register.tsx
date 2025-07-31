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

function Register() {
  const data = [
    {
      id: "1",
      description: "Elemento 1",
    },
    {
      id: "2",
      description: "Elemento 2",
    },
    {
      id: "3",
      description: "Elemento 3",
    },
  ];
  const form = useForm<RegisterUserType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      identification: "",
      firstName: "",
      firstLastName: "",
      username: "",
      password: "",
      role: "",
    },
  });

  async function submitForm(data: RegisterUserType) {
    console.log(data);
  }

  return (
    <>
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
              fieldTittle="Nombres"
              nameInSchema="firstName"
              className="mb-7"
            />
            <InputWithLabel
              type="text"
              fieldTittle="Apellidos"
              nameInSchema="firstLastName"
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
  );
}

export default Register;

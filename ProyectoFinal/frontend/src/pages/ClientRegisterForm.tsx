import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { type ClientType, ClientSchema } from "@/interfaces/Client";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
import { DynamicInputList } from "@/components/ui/DynamicInputList";
import { SiteForm } from "@/components/SiteForm/SiteForm";

function ClienteForm() {
    const form = useForm<ClientType>({
        mode: "onBlur",
        resolver: zodResolver(ClientSchema),
        defaultValues: {
            type: "",
            identification: "",
            name: "",
            country: "",
            phone:"",
            email:"",
            adress:""
        },
    });


    const dataPeopleType = [
        {
            id: "1",
            description: "NIT",
        },
        {
            id: "2",
            description: "Cedula",
        },
        {
            id: "3",
            description: "Cedula Extranjeria",
        },
    ];


    async function submitForm(data: ClientType) {
        console.log("Pruebnaasda")
        console.log(data);
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8 lg:shadow-2xl p-5 rounded bg-white">
            <div className="flex justify-center items-center">
                <h2 className="text-2xl font-bold mb-2">Cliente Form</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)}>
                    {/* Campos simples */}
                    <SelectWithLabel
                        data={dataPeopleType}
                        fieldTittle="Type"
                        nameInSchema="type"
                        className="mb-7"
                    />

                    <InputWithLabel
                        type="text"
                        fieldTittle="Identificación"
                        nameInSchema="identification"
                        className="mb-7"
                    />
                    <InputWithLabel
                        type="text"
                        fieldTittle="Razón Social (firmenname)"
                        nameInSchema="name"
                        className="mb-7"
                    />
                    <InputWithLabel
                        type="text"
                        fieldTittle="Country"
                        nameInSchema="country"
                        className="mb-7"
                    />
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

                    <Button
                        type="submit"
                        className="hover:bg-primaryBlue mt-7 ease-in-out duration-500"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
            <SiteForm/>
        </div>
    );
}

export default ClienteForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { type ClienteType, ClienteSchema } from "@/interfaces/Client";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
import { DynamicInputList } from "@/components/ui/DynamicInputList";

function ClienteForm() {
    const form = useForm<ClienteType>({
        mode: "onBlur",
        resolver: zodResolver(ClienteSchema),
        defaultValues: {
            type: "",
            typeId: "",
            identification: "",
            firmenname: "",
            country: "",
            phNumbers: [{ value: "" }], // Array de objetos con valor de teléfono
            emailAddresses: [{ value: "" }], // Array de objetos con valor de email
        },
    });

    const dataIDs = [
        {
            id: "1",
            description: "Persona Natural",
        },
        {
            id: "2",
            description: "Persona Juridica",
        },
    ];

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

    // Para teléfonos
    const { fields: fieldsPh, append: appendPh, remove: removePh } = useFieldArray({
    control: form.control,
    name: "phNumbers"
    });

    // Para emails
    const { fields: fieldsEmail, append: appendEmail, remove: removeEmail } = useFieldArray({
    control: form.control,
    name: "emailAddresses"
    });

    async function submitForm(data: ClienteType) {
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
                    <SelectWithLabel
                        data={dataIDs}
                        fieldTittle="Type ID"
                        nameInSchema="typeId"
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
                        nameInSchema="firmenname"
                        className="mb-7"
                    />
                    <InputWithLabel
                        type="text"
                        fieldTittle="Country"
                        nameInSchema="country"
                        className="mb-7"
                    />

                    <DynamicInputList
                        label="Teléfonos"
                        name="phNumbers"
                        fields={fieldsPh}
                        append={appendPh}
                        remove={removePh}
                    />
                    <DynamicInputList
                        label="Emails"
                        name="emailAddresses"
                        fields={fieldsEmail}
                        append={appendEmail}
                        remove={removeEmail}
                    />
                    <Button
                        type="submit"
                        className="hover:bg-primaryBlue mt-7 ease-in-out duration-500"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default ClienteForm;

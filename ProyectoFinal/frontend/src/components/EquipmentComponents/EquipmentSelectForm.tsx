import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { getTypeEquipments } from "@/api/TypeEquiment.API";
import { getClients } from "@/api/Client.API";
import { getServiceAreasPerClient } from "@/api/ServiceArea.API";

type EquipmentSelectFormProps = {
    isDialogOpen?: boolean;
};

export function EquipmentSelectForm({ isDialogOpen }: EquipmentSelectFormProps) {
    const { control } = useFormContext();

    const selectedClient = useWatch({
        control,
        name: "cliente",
    });

    const [selectTypeEquipment, setSelectTypeEquipment] = useState<
        { id: string; description: string }[]
    >([]);
    const [selectClients, setSelectClients] = useState<
        { id: string; description: string }[]
    >([]);
    const [selectServiceAreas, setSelectServiceAreas] = useState<
        { id: string; description: string }[]
    >([]);

    const fetchTypeEquipments = async () => {
        try {
            const typeEquipments = await getTypeEquipments();
            setSelectTypeEquipment(
                (typeEquipments ?? []).map((item) => ({
                    id: item.id,
                    description: item.name,
                }))
            );
        } catch (error) {
            console.error("Error fetching type equipment:", error);
        }
    };

    const fetchClients = async () => {
        try {
            const clients = await getClients();
            setSelectClients(
                (clients ?? []).map((item) => ({
                    id: item.id,
                    description: item.name,
                }))
            );
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const fetchServiceAreas = async (clientId: string) => {
        try {
            const serviceAreas = await getServiceAreasPerClient(clientId);
            setSelectServiceAreas(
                (serviceAreas ?? []).map((item) => ({
                    id: item.id,
                    description: item.name,
                }))
            );
        } catch (error) {
            console.error("Error fetching service areas:", error);
        }
    };

    useEffect(() => {
        fetchTypeEquipments();
        fetchClients();
    }, []);

    useEffect(() => {
        console.log("Sfsasa")
        if (!isDialogOpen) {
            fetchTypeEquipments();
        }
    }, [isDialogOpen]);

    useEffect(() => {
        if (selectedClient) {
            fetchServiceAreas(selectedClient);
        } else {
            setSelectServiceAreas([]);
        }
    }, [selectedClient]);

    return (
        <>
            <SelectWithLabel
                data={selectTypeEquipment}
                fieldTittle="Tipo de Equipo"
                nameInSchema="tipo_equipo"
                className="mb-7"
            />
            <SelectWithLabel
                data={selectClients}
                fieldTittle="Cliente"
                nameInSchema="cliente"
                className="mb-7"
            />
            {selectedClient && (
                <SelectWithLabel
                    data={selectServiceAreas}
                    fieldTittle="Área de Servicio"
                    nameInSchema="area_servicio"
                    className="mb-7"
                />
            )}
        </>
    );
}

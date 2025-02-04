import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../components/UploadImage";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, updateItem } from "../utils/api";
import { TextInput, NumberInput, Textarea, Select, Button, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import UserDetailContext from "../context/UserDetailContext";

const UpdateItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeUploadStep, setActiveUploadStep] = useState(0);

    const [itemDetails, setItemDetails] = useState({
        title: "",
        condition: "",
        address: "",
        price: 0,
        description: "",
        image: "",
        userEmail: ""
    });

    const {
        userDetails: { token }
    } = useContext(UserDetailContext);

    // Fetch item details
    const { data: item, isLoading: isFetching } = useQuery(
        ["item", id],
        () => getItem(id),
        {
            onSuccess: (data) => setItemDetails(data),
            onError: () => toast.error("Failed to fetch item details", { position: "bottom-right" }),
        }
    );

    // Handle input changes
    const handleSelectChange = (field) => (value) => {
        setItemDetails((prev) => ({ ...prev, [field]: value }));
    };

    // Upload Image Steps
    const nextUploadStep = () => setActiveUploadStep((current) => (current < 2 ? current + 1 : current));
    const prevUploadStep = () => setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    // Mutation for updating the item
    const { mutate, isLoading } = useMutation(
        () => updateItem(id, itemDetails, token),
        {
            onSuccess: () => {
                toast.success("Item updated successfully!", { position: "bottom-right" });
                setTimeout(() => navigate("/"), 2000);
            },
            onError: ({ response }) => {
                toast.error(response?.data?.message || "Update failed", { position: "bottom-right" });
            }
        }
    );

    if (isFetching)
        return <p className="text-center mt-10">Loading item details...</p>;

    return (
        <div className="mt-24 ml-[30%] mr-[28%]">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Item</h2>
            <TextInput
                placeholder="Title"
                label="Title"
                className="mb-10"
                value={itemDetails.title}
                onChange={(e) => setItemDetails((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Select
                label="Condition"
                placeholder="Select"
                data={["new", "nearly new", "old"]}
                className="mb-10"
                value={itemDetails.condition}
                onChange={handleSelectChange("condition")}
            />
            <TextInput
                placeholder="Address"
                label="Pick-up Address"
                className="mb-10"
                value={itemDetails.address}
                onChange={(e) => setItemDetails((prev) => ({ ...prev, address: e.target.value }))}
            />
            <NumberInput
                label="Price"
                placeholder="1000"
                className="mb-10"
                value={itemDetails.price}
                onChange={handleSelectChange("price")}
            />
            <Textarea
                label="Description"
                placeholder="Make it shine"
                className="mb-10"
                value={itemDetails.description}
                onChange={(e) => setItemDetails((prev) => ({ ...prev, description: e.target.value }))}
            />
            <UploadImage
                activeUploadStep={activeUploadStep}
                prevStep={prevUploadStep}
                nextStep={nextUploadStep}
                details={itemDetails}
                setDetails={setItemDetails}
            />
            <Group justify="center" className="mt-10">
                <Button onClick={() => mutate()} loading={isLoading}>
                    Update
                </Button>
            </Group>
        </div>
    );
};

export default UpdateItemPage;

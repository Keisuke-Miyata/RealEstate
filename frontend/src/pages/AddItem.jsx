import React, { useState, useContext } from "react"
import UploadImage from "../components/UploadImage"
import { useAuth0 } from "@auth0/auth0-react"
import { createItem, getItem, updateItem } from "../utils/api"
import useItems from "../hooks/useItems"
import { TextInput, NumberInput, Textarea, Group, Select, Button } from "@mantine/core"
import { useMutation, useQuery } from 'react-query';
import { toast } from "react-toastify"
import UserDetailContext from '../context/UserDetailContext';
import { validateItemForm } from "../utils/common.js"
import { useParams, useNavigate } from "react-router-dom";


const AddItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth0()
    const [activeUploadStep, setActiveUploadStep] = useState(0);
    const [errors, setErrors] = useState({});

    const [itemDetails, setItemDetails] = useState({
        title: "",
        condition: "",
        address: "",
        price: 0,
        description: "",
        image: "",
        userEmail: user?.email
    })

    const { userDetails: { token } } = useContext(UserDetailContext)

    useQuery(["item", id], () => getItem(id), {
        enabled: !!id,
        onSuccess: (data) => {
            setItemDetails(data);
        },
        onError: () => toast.error("Failed to fetch item details", { position: "bottom-right" }),
    });

    const handleSelectChange = (field) => (value) => {
        setItemDetails((prev) => ({ ...prev, [field]: value }));
    };

    const nextUploadStep = () =>
        setActiveUploadStep((current) => (current < 2 ? current + 1 : current));

    const prevUploadStep = () =>
        setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    const { refetch: refetchItems } = useItems()

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const newErrors = validateItemForm(itemDetails);
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
                console.error("Form validation failed:", newErrors);
                return;
            }
            try {
                if (id) {
                    await updateItem(id, itemDetails, token);
                    toast.success("Updated successfully", { position: "bottom-right" });
                } else {
                    await createItem(itemDetails, token, user?.email);
                    toast.success("Added successfully", { position: "bottom-right" });
                }
                setTimeout(() => navigate("/"), 3000);
            } catch (error) {
                toast.error(error?.response?.data?.message || "An unexpected error occurred.", { position: "bottom-right" });
            }
        }
    })

    return (
        <div className='mt-24 ml-[30%] mr-[28%]'>
            <div className="form-container">
                <TextInput
                    placeholder="title"
                    label="Title"
                    value={itemDetails.title}
                    onChange={(e) =>
                        setItemDetails((prev) => ({ ...prev, title: e.target.value }))}
                />
                {errors.title && <p className="error-style">{errors.title}</p>}
            </div>

            <div className="form-container">
                <Select
                    label="condition"
                    placeholder="Select"
                    data={["New (Unopened)", "Like New / Mint Condition", "Good Condition", "Fair Condition", "Poor Condition"]}
                    value={itemDetails.condition}
                    onChange={handleSelectChange("condition")}
                />
                {errors.condition && <p className="error-style">{errors.condition}</p>}

            </div>

            <div className="form-container">
                <TextInput
                    placeholder="address"
                    label="pick up Address"
                    value={itemDetails.address}
                    onChange={(e) =>
                        setItemDetails((prev) => ({ ...prev, address: e.target.value }))
                    }
                />
                {errors.address && <p className="error-style">{errors.address}</p>}
            </div>

            <div className="form-container">
                <NumberInput
                    label="price"
                    placeholder="1000"
                    value={itemDetails.price}
                    onChange={handleSelectChange("price")}
                />
                {errors.price && <p className="error-style">{errors.price}</p>}
            </div>

            <div className="form-container">
                <Textarea
                    label="Description"
                    placeholder='Make it shine'
                    value={itemDetails.description}
                    onChange={(e) =>
                        setItemDetails((prev) => ({ ...prev, description: e.target.value }))
                    }
                />
                {errors.description && <p className="error-style">{errors.description}</p>}

            </div>

            <div className="form-container">
                <UploadImage
                    activeUploadStep={activeUploadStep}
                    prevStep={prevUploadStep}
                    nextStep={nextUploadStep}
                    details={itemDetails}
                    setDetails={setItemDetails}
                />
                {errors.image && <p className="error-style">{errors.image}</p>}
            </div>

            <Group justify="center" className='mt-10 mb-10'>
                <Button
                    onClick={() => mutate()}
                    loading={isLoading}
                >
                    Submit
                </Button>
            </Group>
        </div>
    )
}

export default AddItem
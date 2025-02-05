import React, { useState, useContext } from "react"
import UploadImage from "../components/UploadImage"
import { useAuth0 } from "@auth0/auth0-react"
import { createItem } from "../utils/api"
import useItems from "../hooks/useItems"
import { TextInput, NumberInput, Textarea, Group, Select, Button } from "@mantine/core"
import { useMutation } from 'react-query';
import { toast } from "react-toastify"
import UserDetailContext from '../context/UserDetailContext';


const AddItem = () => {
    const { user } = useAuth0()
    const [activeUploadStep, setActiveUploadStep] = useState(0); // Separate state for UploadImage steps

    const [itemDetails, setItemDetails] = useState({
        title: "",
        condition: "",
        address: "",
        price: 0,
        description: "",
        image: "",
        userEmail: user?.email
    })

    const handleSelectChange = (field) => (value) => {
        setItemDetails((prev) => ({ ...prev, [field]: value }));
    };

    const nextUploadStep = () =>
        setActiveUploadStep((current) => (current < 2 ? current + 1 : current));

    const prevUploadStep = () =>
        setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    const {
        userDetails: { token },
    } = useContext(UserDetailContext)
    const { refetch: refetchItems } = useItems()

    const { mutate, isLoading } = useMutation({
        mutationFn: () =>
            createItem(
                itemDetails,
                token,
                user?.email
            ),
        onError: ({ response }) =>
            toast.error(response.data.message, { position: "bottom-right" }),
        onSettled: () => {
            toast.success("Added successfully", { position: "bottom-right" })
            setItemDetails({
                title: "",
                condition: "",
                address: "",
                price: 0,
                description: "",
                image: "",
                userEmail: user?.email
            })
            refetchItems();
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }
    })

    return (
        <div className='mt-24 ml-[30%] mr-[28%]'>
            <TextInput
                placeholder="title"
                label="Title"
                className="mb-10"
                value={itemDetails.title}
                onChange={(e) =>
                    setItemDetails((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Select
                label="condition"
                placeholder="Select"
                data={["New (Unopened)", "Like New / Mint Condition", "Good Condition", "Fair Condition", "Poor Condition"]}
                className='mb-10'
                onChange={handleSelectChange("condition")}
            />
            <TextInput
                placeholder="address"
                label="pick up Address"
                className='mb-10'
                value={itemDetails.address}
                onChange={(e) =>
                    setItemDetails((prev) => ({ ...prev, address: e.target.value }))
                }
            />
            <NumberInput
                label="price"
                placeholder="1000"
                className='mb-10'
                value={itemDetails.price}
                onChange={handleSelectChange("price")}
            />
            <Textarea
                label="Description"
                placeholder='Make it shine'
                className='mb-10'
                value={itemDetails.description}
                onChange={(e) =>
                    setItemDetails((prev) => ({ ...prev, description: e.target.value }))
                }
            />
            <UploadImage
                activeUploadStep={activeUploadStep}
                prevStep={prevUploadStep}
                nextStep={nextUploadStep}
                details={itemDetails}
                setDetails={setItemDetails}
            />
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
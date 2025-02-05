import { useContext, useState } from "react";
import { Stepper, Button, Group, NumberInput, Select, TextInput, Radio, Textarea, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import UploadImage from "../components/UploadImage";
import PreviewProperty from "../components/PreviewProperty";
import { useAuth0 } from "@auth0/auth0-react";
import { updateProperty, getProperty } from "../utils/api";
import UserDetailContext from "../context/UserDetailContext";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneNumberForm from "../components/PhoneNumberForm"


const UpdatePropertyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const [activeUploadStep, setActiveUploadStep] = useState(0);
    const { user } = useAuth0();

    const {
        userDetails: { token },
    } = useContext(UserDetailContext);

    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        accommodationType: "",
        type: "",
        address: "",
        size: 0,
        room: 0,
        bathroom: 0,
        tenants: 0,
        rent: 0,
        parking: "",
        internet: "",
        furnish: "",
        billsIncluded: false,
        bond: 0,
        dateAvailability: new Date(),
        min: "",
        max: "",
        image: "",
        description: "",
        accepting: [],
        features: [],
        overview: [],
        facilities: {},
        phoneNumber: "",
        userEmail: user?.email,
    });

    // Fetch property details
    const { data, isLoading } = useQuery(["property", id], () => getProperty(id), {
        onSuccess: (data) => {
            console.log(data)
            setPropertyDetails(data)
            setPropertyDetails({
                ...data,
                dateAvailability: data.dateAvailability ? new Date(data.dateAvailability) : new Date(),
            });
        },
        onError: (error) => {
            toast.error("Failed to fetch property details");
            console.error(error);
        },
    });

    const nextStep = () => {
        setActive((current) => (current < 3 ? current + 1 : current));
        window.scrollTo(0, 0);
    };
    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
        window.scrollTo(0, 0);
    };
    const nextUploadStep = () => setActiveUploadStep((current) => (current < 2 ? current + 1 : current));
    const prevUploadStep = () => setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    const handleSelectChange = (field) => (value) => {
        setPropertyDetails((prev) => ({ ...prev, [field]: value }));
    };

    const { mutate, isLoading: isUpdating } = useMutation({
        mutationFn: () => updateProperty(id, propertyDetails, token),
        onError: ({ response }) => {
            toast.error(response?.data?.message || "Failed to update property", { position: "bottom-right" });
        },
        onSuccess: () => {
            toast.success("Updated successfully!", { position: "bottom-right" });

            setTimeout(() => {
                navigate("/");
            }, 3000);
        },
    });

    if (isLoading) return <p>Loading property details...</p>;


    return (
        <div className='mt-24 ml-[30%] mr-[28%]'>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="First step" description="Fill out information">
                    <TextInput
                        placeholder="title"
                        label="Title"
                        className='mb-10'
                        value={propertyDetails.title}
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />
                    <Select
                        label="What type of accommodation are you offering?"
                        placeholder="Pick value"
                        data={['Room(s) in an existing sharehouse', 'Whole property for rent', 'Student accommodation', 'Homestay']}
                        className='mb-10'
                        value={propertyDetails.accommodationType}
                        onChange={handleSelectChange("accommodationType")}
                    />
                    <Select
                        label="What type of property is this?"
                        placeholder="pick one"
                        data={["2+ Bedrooms", "1 Bedroom", "Studio"]}
                        className='mb-10'
                        value={propertyDetails.type}
                        onChange={handleSelectChange("type")}
                    />
                    <TextInput
                        placeholder="address"
                        label="Property Address"
                        className='mb-10'
                        value={propertyDetails.address}
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, address: e.target.value }))
                        }
                    />
                    <NumberInput
                        label="Size of the property"
                        placeholder="1"
                        className='mb-10'
                        value={propertyDetails.size}
                        onChange={handleSelectChange("size")}
                    />
                    <NumberInput
                        label="Total bedrooms"
                        placeholder="1"
                        className='mb-10'
                        value={propertyDetails.room}
                        onChange={handleSelectChange("room")}
                    />
                    <NumberInput
                        label="Total bathrooms"
                        placeholder="1"
                        className='mb-10'
                        value={propertyDetails.bathroom}
                        onChange={handleSelectChange("bathroom")}
                    />
                    <NumberInput
                        label="Total tenants"
                        placeholder="1"
                        className='mb-10'
                        value={propertyDetails.tenants}
                        onChange={handleSelectChange("tenants")}
                    />
                    <Select
                        label="Parking"
                        placeholder='Select'
                        data={["yes", "no"]}
                        className='mb-10'
                        value={propertyDetails.parking}
                        onChange={handleSelectChange("parking")}
                    />
                    <Select
                        label="Internet"
                        placeholder='Select'
                        data={["yes", "no"]}
                        className='mb-10'
                        value={propertyDetails.internet}
                        onChange={handleSelectChange("internet")}
                    />
                    <Select
                        label="Room furnishing"
                        placeholder="Select"
                        data={["Flexible", "Unfurnished", "Furnished"]}
                        className='mb-10'
                        value={propertyDetails.furnish}
                        onChange={handleSelectChange("furnish")}
                    />

                    <Checkbox.Group
                        defaultValue={['Retirees']}
                        label="Select your preferences"
                        value={propertyDetails.accepting}
                        onChange={(selectedDetails) =>
                            setPropertyDetails((prevData) => ({
                                ...prevData,
                                accepting: selectedDetails,
                            }))
                        }
                    >
                        <Group mt="xl" mb="xl">
                            <Checkbox value="Retirees" label="Retirees" />
                            <Checkbox value="Students" label="Students" />
                            <Checkbox value="LGBTQIA+" label="LGBTQIA+" />
                            <Checkbox value="40+ years" label="40+ years" />
                        </Group>
                    </Checkbox.Group>

                    <Checkbox.Group
                        label="Select your choices"
                        value={propertyDetails.features}
                        onChange={(selectedDetails) =>
                            setPropertyDetails((prevData) => ({
                                ...prevData,
                                features: selectedDetails,
                            }))
                        }
                    >
                        <Group mt="xl" mb="xl">
                            <Checkbox value="Off streent parking" label="Off streent parking" />
                            <Checkbox value="Internet included in rent" label="Internet icluded in rent" />
                        </Group>
                    </Checkbox.Group>

                    <Checkbox.Group
                        defaultValue={['Queen bed']}
                        label="Select your set up"
                        value={propertyDetails.overview}
                        onChange={(selectedDetails) =>
                            setPropertyDetails((prevData) => ({
                                ...prevData,
                                overview: selectedDetails,
                            }))
                        }
                    >
                        <Group mt="xl" ml='xl'>
                            <Checkbox value="Queen bed" label="Queen bed" />
                            <Checkbox value="Drawers" label="Drawers" />
                            <Checkbox value="Wardrobe" label="Wardrobe" />
                            <Checkbox value="Door lock" label="Door lock" />
                            <Checkbox value="Couch" label="Couch" />
                            <Checkbox value="Nightstand / Bedside Table" label="Nightstand / Bedside Table" />
                            <Checkbox value="Armchair" label="Armchair" />
                            <Checkbox value="Bookshelf" label="Bookshelf" />
                            <Checkbox value="TV / Entertainment" label="TV / Entertainment" />
                            <Checkbox value="Room Lock" label="Room Lock" />
                            <Checkbox value="Curtains" label="Curtains" />
                            <Checkbox value="Carpet" label="Carpet" />
                        </Group>
                    </Checkbox.Group>

                    <h2>Rent, bond and bills</h2>
                    <NumberInput
                        label="Monthly rent"
                        value={propertyDetails.rent}
                        onChange={handleSelectChange("rent")}
                    />
                    <Checkbox
                        label="Bills included in rent"
                        value={propertyDetails.billsIncluded}
                        className='mb-10 mt-4'
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, billsIncluded: e.target.checked }))
                        }
                    />
                    <NumberInput
                        label="Bond"
                        className='mb-10'
                        value={propertyDetails.bond}
                        onChange={handleSelectChange("bond")}
                    />
                    <h2>Property Availability</h2>
                    {console.log(propertyDetails.address)}
                    <DateInput
                        value={propertyDetails.dateAvailability}
                        onChange={(value) =>
                            setPropertyDetails((prev) => ({
                                ...prev,
                                dateAvailability: value
                            }))
                        }
                        label="Date input"
                        placeholder="Date input"
                    />


                    <Select
                        label="Minimum length of stay"
                        placeholder='No minimum stay'
                        className='mb-10'
                        data={["2 weeks", '1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '7 months', '8 months', '9 months', '10 months', '11 months', '12 months']}
                        value={propertyDetails.min}
                        onChange={handleSelectChange("min")}
                    />
                    <Select
                        label="Maximum length of stay"
                        placeholder='No maximum stay'
                        className='mb-10'
                        data={["2 weeks", '1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '7 months', '8 months', '9 months', '10 months', '11 months', '12 months']}
                        value={propertyDetails.max}
                        onChange={handleSelectChange("max")}
                    />
                    <Textarea
                        label="Description"
                        placeholder='Make it shine'
                        className='mb-10'
                        value={propertyDetails.description}
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, description: e.target.value }))
                        }
                    />
                    <PhoneNumberForm
                        formData={propertyDetails}
                        setFormData={setPropertyDetails}
                        value={propertyDetails.phoneNumber}

                    />

                </Stepper.Step>
                <Stepper.Step label="Second step" description="Upload Images">
                    <UploadImage
                        activeUploadStep={activeUploadStep}
                        prevStep={prevUploadStep}
                        nextStep={nextUploadStep}
                        details={propertyDetails}
                        setDetails={setPropertyDetails}
                    />
                </Stepper.Step>
                <Stepper.Step label="Final step" description="Preview">
                    <PreviewProperty propertyDetails={propertyDetails} />
                    <Group justify="center" className='mt-10'>
                        <Button
                            onClick={() => mutate()}
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    </Group>
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" className='mb-10 mt-20'>
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </div>
    )
}

export default UpdatePropertyPage
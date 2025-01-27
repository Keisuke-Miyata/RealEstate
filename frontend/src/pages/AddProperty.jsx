import { useState } from 'react';
import { Stepper, Button, Group, NumberInput, Select, TextInput, Radio, Textarea, Checkbox } from '@mantine/core';
import { DateInput } from '@mantine/dates'
import UploadImage from '../components/UploadImage';
import PreviewProperty from "../components/PreviewProperty";

function AddProperty() {
    const [active, setActive] = useState(0);
    const [activeUploadStep, setActiveUploadStep] = useState(0); // Separate state for UploadImage steps
    const [propertyDetails, setPropertyDetails] = useState({
        accommodationType: "",
        type: "",
        address: "",
        room: null,
        rent: null,
        parking: "",
        internet: "",
        furnish: "",
        billsIncluded: false,
        bond: null,
        dateAvailability: "",
        min: "",
        max: "",
        image: null,
        description: "",
        accepting: [],
        features: [],
        overview: []
    });

    const [value, setValue] = useState([])

    const nextStep = () => {
        setActive((current) => (current < 3 ? current + 1 : current));
        window.scrollTo(0, 0);
        console.log(propertyDetails)
    };
    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
        window.scrollTo(0, 0)
    };
    const nextUploadStep = () =>
        setActiveUploadStep((current) => (current < 2 ? current + 1 : current));
    const prevUploadStep = () =>
        setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    // Generic function to handle Select changes
    const handleSelectChange = (field) => (value) => {
        setPropertyDetails((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <div className='mt-24 ml-[30%] mr-[28%]'>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="First step" description="Fill out information">
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
                        label="Total bedrooms"
                        placeholder="1"
                        className='mb-10'
                        value={propertyDetails.room}
                        onChange={handleSelectChange("room")}
                    />
                    <Select
                        label="Parking"
                        placeholder='Select'
                        data={["yes", "no"]}
                        className='mb-10'
                        onChange={handleSelectChange("parking")}
                    />
                    <Select
                        label="Internet"
                        placeholder='Select'
                        data={["yes", "no"]}
                        className='mb-10'
                        onChange={handleSelectChange("internet")}
                    />
                    <Select
                        label="Room furnishing"
                        placeholder="Select"
                        data={["Flexible", "Unfurnished", "Furnished"]}
                        className='mb-10'
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
                            <Checkbox value="Door lock" label="Door lock" />
                            <Checkbox value="Couch" label="Couch" />
                        </Group>
                    </Checkbox.Group>

                    <h2>Rent, bond and bills</h2>
                    <NumberInput
                        label="Monthly rent"
                        onChange={handleSelectChange("rent")}
                    />
                    <Radio
                        label="Bills included in rent"
                        className='mb-10 mt-5'
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, billsIncluded: e.target.checked }))
                        }
                    />
                    <NumberInput
                        label="Bond"
                        className='mb-10'
                        onChange={handleSelectChange("bond")}
                    />
                    <h2>Property Availability</h2>
                    <DateInput
                        value={propertyDetails.dateAvailability}
                        onChange={(value) =>
                            setPropertyDetails((prev) => ({ ...prev, dateAvailability: value }))
                        }
                        label="Date input"
                        placeholder="Date input"
                    />

                    <Select
                        label="Minimum length of stay"
                        placeholder='No minimum stay'
                        data={["2 weeks", "one year"]}
                        className='mb-10'
                        onChange={handleSelectChange("min")}
                    />
                    <Select
                        label="Maximum length of stay"
                        placeholder='No minimum stay'
                        data={["one month", "one year"]}
                        className='mb-10'
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
    );
}

export default AddProperty

import React, { useState } from "react";
import { Select, TextInput, NumberInput, Button, Checkbox, Group } from "@mantine/core";
import UploadImage from "../components/UploadImage";
import PersonalForm from "../components/PersonalForm";
import { DateInput } from "@mantine/dates"
import axios from "axios"; // Make sure you have axios installed for API calls

const AddTenant = () => {
    const [preference, setPreference] = useState(""); // To track selected option
    const [groupMembers, setGroupMembers] = useState([{ id: Date.now() }]); // Group members state
    const [activeUploadStep, setActiveUploadStep] = useState(0);

    // Form state for tenant details
    const [formData, setFormData] = useState({
        name: "",
        nationality: "",
        fieldOfStudy: "",
        gender: "",
        introduction: "",
        partnerName: "",
        partnerGender: "",
        partnerNationality: "",
        partnerFieldOfStudy: "",
        groupMembers: [],
        monthlyBudget: null,
        preferredMoveDate: "",
        maxFlatmates: "",
        parking: "",
        image: null,
        location: "",
        placeType: "",
        age: null,
        details: []
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // Add a new member to the group
    const addGroupMember = () => {
        setGroupMembers([...groupMembers, { id: Date.now() }]);
    };

    // Remove a specific group member
    const removeGroupMember = (id) => {
        setGroupMembers(groupMembers.filter((member) => member.id !== id));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData((prevData) => ({
            ...prevData,
            details: preference, // Add selected checkboxes to details
        }));

        // Prepare data for submission
        const dataToSubmit = {
            ...formData,
            groupMembers: groupMembers.map((member) => ({
                name: member.name || "",
                nationality: member.nationality || "",
                gender: member.gender || "",
            })),
        };
        console.log(dataToSubmit)
        try {
            // Make an API request to save data (replace the URL with your backend endpoint)
            const response = await axios.post("/api/tenants", dataToSubmit);
            console.log("Tenant data submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting tenant data:", error);
        }
    };

    const nextUploadStep = () =>
        setActiveUploadStep((current) => (current < 2 ? current + 1 : current));
    const prevUploadStep = () =>
        setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    return (
        <div className='mt-40 ml-[30%] mr-[28%]'>
            <form onSubmit={handleSubmit}>
                <Select
                    label="What type of place are you looking for"
                    placeholder=""
                    data={["Room(s) in an existing sharehouse", "Studio", "One bed flat", "Shared Room"]}
                    className="mb-10"
                    value={formData.placeType}
                    onChange={(value) => setFormData({ ...formData, placeType: value })}
                />
                <Select
                    label="Where would you like to live?"
                    placeholder="Search for campus"
                    data={["cassai"]}
                    className="mb-10"
                    value={formData.location}
                    onChange={(value) => setFormData({ ...formData, location: value })}
                />
                <h2 className="text-lg font-semibold mb-2">Rent and timing</h2>
                <NumberInput
                    label="Monthly budget"
                    className="mb-10"
                    value={formData.monthlyBudget}
                    onChange={(value) => setFormData({ ...formData, monthlyBudget: value })}
                />
                <DateInput
                    label="Preferred move date"
                    className="mb-10"
                    value={formData.preferredMoveDate}
                    onChange={(value) => setFormData((prev) =>({ ...prev, preferredMoveDate: value }))}
                />
                <Select
                    label="Max number of flatmates"
                    placeholder=""
                    data={["Flexible", "1 other", "2+ others"]}
                    className="mb-10"
                    value={formData.maxFlatmates}
                    onChange={(value) => setFormData({ ...formData, maxFlatmates: value })}
                />
                <Select
                    label="Parking"
                    placeholder=""
                    data={["Flexible", "Off-street required"]}
                    className="mb-10"
                    value={formData.parking}
                    onChange={(value) => setFormData({ ...formData, parking: value })}
                />

                {/* Selectable Items */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Who are you applying with?</h3>
                    <div className="flex gap-4 justify-center mt-10">
                        {["Me", "Couple", "Group"].map((item) => (
                            <button
                                key={item}
                                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${preference === item ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"
                                    }`}
                                onClick={() => setPreference(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conditional Rendering */}
                {preference === "Me" && (
                    <>
                        <PersonalForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            setFormData={setFormData}
                        />
                        <TextInput
                            label="Introduce yourself"
                            placeholder="Tell us about yourself"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleInputChange}
                            textarea
                            className="h-20"
                        />
                    </>

                )}

                {/* value={propertyDetails.address}
                        onChange={(e) =>
                            setPropertyDetails((prev) => ({ ...prev, address: e.target.value }))
                        } */}


                {preference === "Couple" && (
                    <div className="space-y-4">
                        <PersonalForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />

                        <h3 className="text-lg font-semibold">About Your Partner</h3>
                        <TextInput
                            label="Partner's Name"
                            placeholder="Enter your partner's name"
                            value={formData.partnerName}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, partnerName: e.target.value }))
                            }
                        />

                        <TextInput
                            label="Nationality"
                            placeholder="Enter your nationality"
                            value={formData.partnerNationality}
                            onChange={(e) => setFormData((prev) => ({ ...prev, partnerNationality: e.target.value }))}
                        />
                        <TextInput
                            label="What do you study?"
                            placeholder="Enter your field of study"
                            name="partnerFieldOfStudy"
                            value={formData.partnerFieldOfStudy}
                            onChange={(e) => setFormData((prev) => ({ ...prev, partnerFieldOfStudy: e.target.value }))}
                        />
                        <TextInput
                            label="Gender your partner identifies as"
                            placeholder="Enter your partner's gender"
                            name="partnerGender"
                            value={formData.partnerGender}
                            onChange={(e) => setFormData((prev) => ({ ...prev, partnerGender: e.target.value }))}
                        />
                        <TextInput
                            label="Introduce yourself"
                            placeholder="Tell us about yourself"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleInputChange}
                            textarea
                            className="h-20"
                        />
                    </div>
                )}

                {preference === "Group" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Your Personal Details</h3>
                        <PersonalForm formData={formData} handleInputChange={handleInputChange} />
                        {groupMembers.map((member, index) => (
                            <div key={member.id} className="border p-4 rounded-lg relative">
                                <h3 className="text-lg font-semibold mb-2">Friend {index + 1}</h3>
                                <TextInput
                                    label="Name"
                                    placeholder="Enter your friend's name"
                                    className="mb-2"
                                    value={member.name}
                                    onChange={(e) =>
                                        setGroupMembers(
                                            groupMembers.map((m) =>
                                                m.id === member.id ? { ...m, name: e.target.value } : m
                                            )
                                        )
                                    }
                                />
                                <TextInput
                                    label="Nationality"
                                    placeholder="Enter your friend's nationality"
                                    className="mb-2"
                                    value={member.nationality}
                                    onChange={(e) =>
                                        setGroupMembers(
                                            groupMembers.map((m) =>
                                                m.id === member.id ? { ...m, nationality: e.target.value } : m
                                            )
                                        )
                                    }
                                />
                                <TextInput
                                    label="Gender your friend identifies as"
                                    placeholder="Enter your friend's gender"
                                    value={member.gender}
                                    onChange={(e) =>
                                        setGroupMembers(
                                            groupMembers.map((m) =>
                                                m.id === member.id ? { ...m, gender: e.target.value } : m
                                            )
                                        )
                                    }
                                />
                                {index > 0 && (
                                    <button
                                        className="absolute top-2 right-2 text-red-500 text-sm"
                                        onClick={() => removeGroupMember(member.id)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <Button
                                onClick={addGroupMember}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                + Add Another Person
                            </Button>
                        </div>
                    </div>
                )}

                {/* Detais */}
                <Checkbox.Group
                    label="Select your preference"
                    value={formData.details}
                    onChange={(selectedDetails) =>
                        setFormData((prevData) => ({
                            ...prevData,
                            details: selectedDetails,
                        }))
                    }
                // description="This is anonymous"
                >
                    <Group mt="xl">
                        <Checkbox value="Furnished room required" label="Furnish" />
                        <Checkbox value="Parking flexible" label="Parking" />
                        <Checkbox value="Internet required" label="Internet" />
                    </Group>
                </Checkbox.Group>

                {/* Image section */}
                <div>
                    <UploadImage
                        activeUploadStep={activeUploadStep}
                        prevStep={prevUploadStep}
                        nextStep={nextUploadStep}
                        details={formData}
                        setDetails={setFormData}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-20 mb-10">
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddTenant;

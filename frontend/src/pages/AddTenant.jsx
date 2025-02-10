import React, { useState, useContext } from "react";
import { Select, TextInput, NumberInput, Button, Checkbox, Group, Textarea } from "@mantine/core";
import UploadImage from "../components/UploadImage";
import PersonalForm from "../components/PersonalForm";
import { DateInput } from "@mantine/dates"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../context/UserDetailContext";

import { useQuery } from "react-query"
import { createTenant, updateTenant, getTenant } from "../utils/api";
import { toast } from "react-toastify";
import useTenant from "../hooks/useTenant";
import { useParams, useNavigate } from "react-router-dom";
import { validateTenantForm } from "../utils/common";

const AddTenant = () => {
    const { id } = useParams();//
    const [preference, setPreference] = useState("");
    const [groupMembers, setGroupMembers] = useState([{ id: Date.now() }]);
    const [activeUploadStep, setActiveUploadStep] = useState(0);
    const { user } = useAuth0()
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();//

    const { userDetails: { token } } = useContext(UserDetailContext);
    const { refetch: refetchTenant } = useTenant();


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
        monthlyBudget: 0,
        preferredMoveDate: new Date(),
        maxFlatmates: "",
        parking: "",
        image: [],
        location: "",
        placeType: "",
        age: 0,
        details: [],
        preference: "",
        max: "",
        phoneNumber: "",
        userEmail: user?.email
    });

    const { data: tenant, isLoading: tenantLoading } = useQuery(
            ["tenant", id],
            () => getTenant(id),
            {
                enabled: !!id,
                onSuccess: (data) => {
                    setFormData(data); //
                    setGroupMembers(data.groupMembers || []);
                    setPreference(data.preference || "");
                    setFormData({
                        ...data,
                        preferredMoveDate: data.preferredMoveDate ? new Date(data.preferredMoveDate) : new Date(),
                    });
                }
            }
        );


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

    const updateFormData = () => {
        setFormData((prevData) => ({
            ...prevData,
            preference: preference,
            groupMembers: groupMembers.map((member) => ({
                name: member.name || "",
                nationality: member.nationality || "",
                gender: member.gender || "",
            })),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateFormData();
        const newErrors = validateTenantForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.error("Form validation failed:", newErrors);
            return;
        }

        try {
                    if (id) {
                        await updateTenant(id, formData, token);
                        toast.success("Tenant updated successfully", { position: "bottom-right" });
                    } else {
                        await createTenant(formData, token, user?.email);
                        toast.success("Tenant added successfully", { position: "bottom-right" });
                    }
        
                    setTimeout(() => navigate("/"), 3000);
                } catch (error) {
                    console.error("Error processing tenant data:", error);
                    toast.error(error?.response?.data?.message || "An unexpected error occurred.", { position: "bottom-right" });
                }
    };

    const nextUploadStep = () =>
        setActiveUploadStep((current) => (current < 2 ? current + 1 : current));
    const prevUploadStep = () =>
        setActiveUploadStep((current) => (current > 0 ? current - 1 : current));

    return (
        <div className='mt-40 ml-[30%] mr-[28%]'>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <Select
                        label="What type of place are you looking for"
                        placeholder=""
                        data={["Room(s) in an existing sharehouse", "Studio", "One bed flat", "Shared Room"]}
                        value={formData.placeType}
                        onChange={(value) => setFormData({ ...formData, placeType: value })}
                    />
                    {errors.placeType && <p className="error-style">{errors.placeType}</p>}
                </div>

                <div className="form-container">
                    <Select
                        label="Where would you like to live?"
                        placeholder="Search for campus"
                        data={["Böszörményi Street Campus", "Main Campus", "Kassai Street Campus", "Engineering Campus"]}
                        className=""
                        value={formData.location}
                        onChange={(value) => setFormData({ ...formData, location: value })}
                    />
                    {errors.location && <p className="error-style">{errors.location}</p>}
                </div>

                <div className="form-container">
                    <Select
                        label="Planning length of stay"
                        placeholder='stay length'
                        data={["2 weeks", '1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '7 months', '8 months', '9 months', '10 months', '11 months', '12 months']}
                        className=''
                        value={formData.max}
                        onChange={(value) => setFormData({ ...formData, max: value })}
                    />
                    {errors.max && <p className="error-style">{errors.max}</p>}
                </div>


                <h2 className="text-lg font-semibold mb-2">Rent and timing</h2>
                <div className="form-container">
                    <NumberInput
                        label="Monthly budget"
                        value={formData.monthlyBudget}
                        onChange={(value) => setFormData({ ...formData, monthlyBudget: value })}
                    />
                    {errors.monthlyBudget && <p className="error-style">{errors.monthlyBudget}</p>}
                </div>


                <DateInput
                    label="Preferred move date"
                    className="mb-10"
                    value={formData.preferredMoveDate}
                    onChange={(value) => setFormData((prev) => ({ ...prev, preferredMoveDate: value }))}
                />
                <div className="form-container">
                    <Select
                        label="Max number of flatmates"
                        placeholder=""
                        data={["Flexible", "1 other", "2+ others"]}
                        className=""
                        value={formData.maxFlatmates}
                        onChange={(value) => setFormData({ ...formData, maxFlatmates: value })}
                    />
                    {errors.maxFlatmates && <p className="error-style">{errors.maxFlatmates}</p>}
                </div>

                <div className="form-container">
                    <Select
                        label="Parking"
                        placeholder=""
                        data={["Flexible", "Off-street required", "Garage parking", "On-street parking", "No parking"]}
                        value={formData.parking}
                        onChange={(value) => setFormData({ ...formData, parking: value })}
                    />
                    {errors.parking && <p className="error-style">{errors.parking}</p>}
                </div>



                {/* Selectable Items */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Who are you applying with?</h3>
                    <div className="flex gap-4 justify-center mt-10">
                        {["Me", "Couple", "Group"].map((item) => (
                            <div
                                key={item}
                                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${preference === item ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"
                                    }`}
                                onClick={() => setPreference(item)}
                            >
                                {item}
                            </div>
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
                            errors={errors}
                        />
                        <div className="form-container">
                            <Textarea
                                label="Introduce yourself"
                                placeholder="Tell us about yourself"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                textarea
                                className="h-20 mt-6"
                            />
                            {errors.introduction && <p className="error-style">{errors.introduction}</p>}
                        </div>


                    </>

                )}

                {preference === "Couple" && (
                    <div className="space-y-4">
                        <PersonalForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            setFormData={setFormData}
                            errors={errors}
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
                        <Select
                            label="Gender your partner identifies as"
                            placeholder="Enter your partner's gender"
                            name="partnerGender"
                            data={["Male", "Female", "Non-Binary"]}
                            value={formData.partnerGender}
                            onChange={(value) => setFormData((prev) => ({ ...prev, partnerGender: value }))}
                        />
                        <div className="form-container">
                            <Textarea
                                label="Introduce yourself"
                                placeholder="Tell us about yourself"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                textarea
                                className="h-20 mt-6"
                            />
                            {errors.introduction && <p className="error-style">{errors.introduction}</p>}
                        </div>
                    </div>
                )}

                {preference === "Group" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Your Personal Details</h3>
                        <PersonalForm formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} errors={errors} />
                        <div className="form-container">
                            <Textarea
                                label="Introduce yourself"
                                placeholder="Tell us about yourself"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                textarea
                                className="h-20 mt-6"
                            />
                            {errors.introduction && <p className="error-style">{errors.introduction}</p>}
                        </div>
                        {groupMembers.map((member, index) => (
                            <div key={member.id} className="border p-4 rounded-lg relative">
                                <h3 className="text-lg font-semibold mb-2">Friend {index + 1}</h3>
                                <TextInput
                                    label="Name"
                                    placeholder="Enter your friend's name"
                                    className="mb-2"
                                    value={member.name}
                                    onChange={(e) =>
                                        setGroupMembers((item) =>
                                            item.map((m) =>
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
                                        setGroupMembers((prev) =>
                                            prev.map((m) =>
                                                m.id === member.id ? { ...m, nationality: e.target.value } : m
                                            )
                                        )
                                    }
                                />
                                <Select
                                    label="Gender your friend identifies as"
                                    placeholder="Enter your friend's gender"
                                    data={["Male", "Female", "Non-Binary"]}
                                    value={member.gender}
                                    onChange={(value) =>
                                        setGroupMembers((prev) =>
                                            prev.map((m) =>
                                                m.id === member.id ? { ...m, gender: value } : m
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

                {/* Details */}
                <Checkbox.Group
                    defaultValue={["Furnished room required"]}
                    label="Select your preference"
                    className="mt-4"
                    value={formData.details}
                    onChange={(selectedDetails) =>
                        setFormData((prevData) => ({
                            ...prevData,
                            details: selectedDetails,
                        }))}
                >
                    <Group mt="xl">
                        <Checkbox value="Furnished room required" label="Furnish" />
                        <Checkbox value="Parking flexible" label="Parking" />
                        <Checkbox value="Internet required" label="Internet" />
                        <Checkbox value="Pet-Friendly" label="Pet-Friendly" />
                        <Checkbox value="Wheelchair Accessible" label="Wheelchair Accessible" />
                        <Checkbox value="Smoking Allowed" label="Smoking Allowed" />
                        <Checkbox value="Garden / Yard" label="Garden / Yard" />
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
                        {errors.image && <p className="error-style">{errors.image}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-20 mb-10">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddTenant;

import React from "react";
import { TextInput, NumberInput, Select } from "@mantine/core";
import PhoneNumberForm from "./PhoneNumberForm"

const PersonalForm = ({ formData, handleInputChange, setFormData }) => {
    return (
        <div className="space-y-4">
            <TextInput
                label="Your Name"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <TextInput
                label="Nationality"
                placeholder="Enter your nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
            />
            <NumberInput
                label="Age"
                className="mb-10"
                value={formData.age}
                onChange={(value) => setFormData({ ...formData, age: value })}
            />
            <TextInput
                label="What do you study?"
                placeholder="Enter your field of study"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
            />
            <PhoneNumberForm
                formData={formData}
                setFormData={setFormData}
            />
            <Select
                label="Gender you identify as"
                placeholder="Pick your choice"
                name="gender"
                data={["Male", "Female", "Non-Binary"]}
                value={formData.gender}
                onChange={(value)=> setFormData({...formData, gender: value})}
            />
        </div>
    );
};

export default PersonalForm;

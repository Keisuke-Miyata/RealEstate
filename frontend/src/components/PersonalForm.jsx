import React from "react";
import { TextInput, NumberInput } from "@mantine/core";

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
            <TextInput
                label="Gender you identify as"
                placeholder="Enter your gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default PersonalForm;

import React, { FC } from "react";
import { TextInput, NumberInput, Select } from "@mantine/core";
import PhoneNumberForm from "./PhoneNumberForm";
import { TenantFormData } from '../../shared/types';

interface Errors {
    name?: string;
    nationality?: string;
    age?: string;
    fieldOfStudy?: string;
    phoneNumber?: string;
    gender?: string;
}

interface PersonalFormProps {
    formData: TenantFormData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<TenantFormData>>;
    errors: Errors;
}

const PersonalForm: FC<PersonalFormProps> = ({ formData, handleInputChange, setFormData, errors }) => {
    return (
        <div className="space-y-4">
            <div className="form-container">
                <TextInput
                    label="Your Name"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                {errors.name && <p className="error-style">{errors.name}</p>}
            </div>

            <div className="form-container">
                <TextInput
                    label="Nationality"
                    placeholder="Enter your nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                />
                {errors.nationality && <p className="error-style">{errors.nationality}</p>}
            </div>

            <div className="form-container">
                <NumberInput
                    label="Age"
                    value={formData.age}
                    onChange={(value) => setFormData({ ...formData, age: typeof value === "number" ? value : 0 })}
                />
                {errors.age && <p className="error-style">{errors.age}</p>}
            </div>

            <div className="form-container">
                <TextInput
                    label="What do you study?"
                    placeholder="Enter your field of study"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                />
                {errors.fieldOfStudy && <p className="error-style">{errors.fieldOfStudy}</p>}
            </div>

            <div className="form-container">
                <PhoneNumberForm
                    formData={formData}
                    setFormData={setFormData}
                />
                {errors.phoneNumber && (<p className="error sm:pl-0 md:pl-20">{errors.phoneNumber}</p>)}
            </div>

            <div className="form-container">
                <Select
                    label="Gender you identify as"
                    placeholder="Pick your choice"
                    name="gender"
                    data={["Male", "Female", "Non-Binary"]}
                    value={formData.gender}
                    onChange={(value) => setFormData({ ...formData, gender: value ?? "" })}
                />
                {errors.gender && <p className="error-style">{errors.gender}</p>}
            </div>
        </div>
    );
};

export default PersonalForm;
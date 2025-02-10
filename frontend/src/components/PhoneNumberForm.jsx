import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const PhoneNumberForm = ({ formData, setFormData }) => {


    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-64 focus-within:border-blue-500">

                <PhoneInput
                    // defaultCountry={selectedCountry}
                    value={formData.phoneNumber}
                    onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
                    className="w-full outline-none"
                />
            </div>
        </div>
    );
}

export default PhoneNumberForm;

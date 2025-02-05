import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

// const countries = getCountries().map((country) => ({
//     value: country,
//     label: `${country} (+${getCountryCallingCode(country)})`,
// }));

const PhoneNumberForm = ({ formData, setFormData }) => {
    // const [selectedCountry, setSelectedCountry] = useState("US");

    return (
        <div className="flex flex-col space-y-3">
            {/* <Select
                options={countries}
                value={countries.find((c) => c.value === selectedCountry)}
                onChange={(option) => setSelectedCountry(option.value)}
                className="w-64"
            /> */}
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

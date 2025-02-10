export const updateFavourites = (id, favourites) => {
    if (favourites?.includes(id)) {
        return favourites.filter((resId) => resId != id);
    } else {
        return [...favourites, id]
    }
}

export const checkFavourites = (id, favourites) => {
    return favourites?.includes(id)
}

export const validateString = (value) => {
    return value?.length < 10 || value === null ? "Must have at least 10 characters" : null;
}

export const validateTenantForm = (formData) => {
    let errors = {};

    if (!formData.placeType) {
        errors.placeType = "Please select the type of place you're looking for.";
    }
    if (!formData.location) {
        errors.location = "Please select a location.";
    }
    if (!formData.max) {
        errors.max = "Please select your planned length of stay.";
    }
    if (!formData.monthlyBudget || formData.monthlyBudget <= 0) {
        errors.monthlyBudget = "Please enter a valid monthly budget.";
    }
    if (!formData.maxFlatmates) {
        errors.maxFlatmates = "Please select the max number of flatmates.";
    }
    if (!formData.parking) {
        errors.parking = "Please select a parking option.";
    }

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = "Please enter your name (at least 2 characters).";
    }
    if (!formData.nationality || formData.nationality.trim().length < 2) {
        errors.nationality = "Please enter your nationality.";
    }
    if (!formData.fieldOfStudy || formData.fieldOfStudy.trim().length < 2) {
        errors.fieldOfStudy = "Please enter your field of study.";
    }

    if (!formData.age || formData.age < 16) {
        errors.age = "Please enter a valid age (16 or older).";
    }
    if (!formData.gender) {
        errors.gender = "Please select your gender.";
    }

    if (!formData.introduction || formData.length < 10) {
        errors.introduction = "Please introduce yourself to the community."
    }

    if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
        errors.phoneNumber = 'Phone number is required.';
    }

    if (!formData.image || formData.image.length === 0) {
        errors.image = "You must upload at least 1 image.";
    }



    return errors;
};


export const validatePropertyForm = (propertyDetails, active) => {
    let errors = {};

    const max = propertyDetails.max ? parseInt(propertyDetails.max.charAt(0), 10) : 0;
    const min = propertyDetails.min ? parseInt(propertyDetails.min.charAt(0), 10) : 0;


    if (active === 0) {
        if (!propertyDetails.title || propertyDetails.title.trim() === "") {
            errors.title = "Title is required.";
        }

        if (!propertyDetails.accommodationType) {
            errors.accommodationType = "Please select the accommodation type.";
        }

        if (!propertyDetails.type) {
            errors.type = "Please select the property type.";
        }

        if (!propertyDetails.address || propertyDetails.address.trim() === "") {
            errors.address = "Address is required.";
        }

        if (propertyDetails.size <= 0) {
            errors.size = "Size must be a positive number.";
        }

        if (propertyDetails.room <= 0) {
            errors.room = "Total bedrooms must be a positive number.";
        }

        if (!propertyDetails.bathroom || propertyDetails.bathroom <= 0) {
            errors.bathroom = "Bathroom count must be a positive number.";
        }

        if (!propertyDetails.tenants || propertyDetails.tenants <= 0) {
            errors.tenants = "Tenant count must be a positive number.";
        }

        if (!propertyDetails.parking) {
            errors.parking = "Please select parking availability.";
        }

        if (!propertyDetails.internet) {
            errors.internet = "Please select internet availability.";
        }

        if (!propertyDetails.furnish) {
            errors.furnish = "Please select room furnishing.";
        }

        if (!propertyDetails.rent || propertyDetails.rent <= 0) {
            errors.rent = "Monthly rent must be a positive number.";
        }
        if (!propertyDetails.bond || propertyDetails.bond <= 0) {
            errors.bond = "Bond amount must be a positive number.";
        }
        if (!propertyDetails.min) {
            errors.min = "Please select a minimum length of stay.";
        }
        if (!propertyDetails.max) {
            errors.max = "Please select a maximum length of stay.";
        }
        if (max < min) {
            errors.max = "Maximum length of stay must be greater than or equal to minimum length of stay.";
        }
        if (!propertyDetails.description || propertyDetails.description.trim() === '') {
            errors.description = "Description is required.";
        }
        if (!propertyDetails.phoneNumber || propertyDetails.phoneNumber.trim() === '') {
            errors.phoneNumber = 'Phone number is required.';
        }
    }

    if (active === 1) {
        if (!propertyDetails.image || propertyDetails.image.length === 0) {
            errors.image = "You must upload at least 1 image.";
        }
    }


    return errors;
};


export const validateItemForm = (itemDetails) => {
    const errors = {};

    if (!itemDetails.title.trim()){
        errors.title = "Title is required.";
    } else if (itemDetails.title.length > 50){
        errors.title = "Title must be under 50 characters"
    }

    if (!itemDetails.condition) {
        errors.condition = "Please select a condition.";
    }

    if (!itemDetails.address.trim()) {
        errors.address = "Pick-up address is required.";
    } else if (itemDetails.address.length < 5) {
        errors.address = "Address must be at least 5 characters.";
    }

    if (itemDetails.price === "" || isNaN(itemDetails.price) || itemDetails.price <= 0) {
        errors.price = "Price must be a positive number.";
    }

    if (itemDetails.description.length > 300) {
        errors.description = "Description cannot exceed 300 characters.";
    } else if (itemDetails.description.length === 0){
        errors.description = "Description is required.";
    }

    if (!itemDetails.image || itemDetails.image.length === 0) {
        errors.image = "You must upload at least 1 image.";
    }

    return errors;
}
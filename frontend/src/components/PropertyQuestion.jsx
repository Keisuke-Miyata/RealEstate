import React from "react"
import { Select, TextInput, NumberInput } from "@mantine/core"


export const Question1 = () => {
    return (
        <Select
            label="What type of accommodation are you offering?"
            placeholder="Pick value"
            data={['Room(s) in an existing sharehouse', 'Whole property for rent', 'Student accommodation', 'Homestay']}
        />
    )
}

export const Question2 = () => {
    return (
        <Select
            label="What type of property is this?"
            placeholder="pick one"
            data={["2+ Bedrooms", "1 Bedroom", "Studio"]}
        />
    )
}

export const Question3 = () => {
    return (
        <TextInput
            placeholder="address"
            label="Property Address"
        />
    )
}

export const Question4 = () => {
    return (
        <NumberInput
            label="Total bedrooms"
            placeholder="1"
        />
    )
}
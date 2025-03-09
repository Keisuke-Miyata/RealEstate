import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"


export const createResidency = asyncHandler(async (req, res) => {
    const { title, accommodationType, type, address, size, room, bathroom, tenants,
        rent, parking, internet, furnish, billsIncluded, bond, dateAvailability,
        min, max, image, description, accepting, features, overview, facilities, phoneNumber, userEmail
    } = req.body.data || req.body

    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                accommodationType,
                type,
                address,
                size,
                room,
                bathroom,
                tenants,
                rent,
                parking,
                internet,
                furnish,
                billsIncluded,
                bond,
                dateAvailability,
                min,
                max,
                image,
                description,
                accepting,
                features,
                overview,
                facilities,
                phoneNumber,
                owner: { connect: { email: userEmail } }
            }
        })

        res.send({ message: "Residency created successfully", residency })

    } catch (err) {
        if (err.code === "P2002") {
            throw new Error("Already have a residency with this address")
        }
        throw new Error(err.message)

    }
})


// get all properties
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send( residencies )
})

//get property by ID
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({ where: { id } })
        res.send(residency)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllUserProperties = asyncHandler(async (req, res) => {
    const { email } = req.query; // Extract email correctly

    try {
        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required" });
        }

        const properties = await prisma.residency.findMany({
            where: { owner: { email } }, // Correct where condition
            orderBy: { createdAt: "desc" },
        });

        res.json(properties); // Use the correct variable name
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error });
    }
});

export const deleteResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const existingResidency = await prisma.residency.findUnique({ where: { id } });

        if (!existingResidency) {
            return res.status(404).json({ message: "Residency not found" });
        }

        await prisma.residency.delete({ where: { id } });

        res.json({ message: "Residency deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting residency", error: err.message });
    }
});

export const updateProperty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: _, ...updateData } = req.body;

    try {
        const residency = await prisma.residency.findUnique({ where: { id } });

        if (!residency) {
            return res.status(404).json({ message: "Residency not found" });
        }

        const updatedResidency = await prisma.residency.update({
            where: { id },
            data: updateData
        });

        res.json(updatedResidency);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

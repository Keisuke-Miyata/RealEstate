import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"

//creating a property
export const createResidency = asyncHandler(async (req, res) => {
    const { title, accommodationType, type, address, room,
        rent, parking, internet, furnish, billsIncluded, bond, dateAvailability,
        min, max, image, description, accepting, features, overview, facilities, userEmail
    } = req.body.data || req.body

    console.log(req.body.data)
    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                accommodationType,
                type,
                address,
                room,
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
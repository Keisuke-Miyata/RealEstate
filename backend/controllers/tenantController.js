import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"

export const createTenant = asyncHandler(async (req, res) => {

    const { name, nationality, fieldOfStudy, gender, introduction,
        partnerName, partnerGender, partnerNationality, partnerFieldOfStudy,
        groupMembers, monthlyBudget, preferredMoveDate, maxFlatmates,
        parking, image, location, placeType, age, details, userEmail
    } = req.body.data || req.body

    console.log("created tenant component")

    try {
        const tenant = await prisma.tenant.create({
            data: {
                name,
                nationality,
                fieldOfStudy,
                gender,
                introduction,
                partnerName,
                partnerGender,
                partnerNationality,
                partnerFieldOfStudy,
                groupMembers,
                monthlyBudget,
                preferredMoveDate,
                maxFlatmates,
                parking,
                image,
                location,
                placeType,
                age,
                details,
                owner: { connect: { email: userEmail }}
            }
        })

        res.send({message: "Tenant card is created successfully", tenant})
    } catch (e) {
        if (e.code === "P2002"){
            throw new Error("Already have a residency with this address")
        }
        throw new Error(e.message)
    }
})

export const getAllTenants = asyncHandler(async (req, res) => {
    const tenants = await prisma.tenant.findMany({
        orderBy: {

            createdAt: "desc"
        }
    })
    res.send( tenants )
})

export const getTenant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const tenant = await prisma.tenant.findUnique({where: {id}})
        res.send(tenant)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllUserTenant = asyncHandler(async (req, res) => {
    const { email } = req.query; // Extract email correctly

    try {
        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required" });
        }

        const tenants = await prisma.tenant.findMany({
            where: { owner: { email } }, // Correct where condition
            orderBy: { createdAt: "desc" },
        });

        res.json(tenants); // Use the correct variable name
    } catch (error) {
        res.status(500).json({ message: "Error fetching tenants", error });
    }
});
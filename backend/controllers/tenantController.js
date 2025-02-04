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

export const deleteTenant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const existingTenant = await prisma.tenant.findUnique({ where: { id } });

        if (!existingTenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        await prisma.tenant.delete({ where: { id } });

        res.json({ message: "Tenant deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting tenant", error: err.message });
    }
});

// export const updateTenant = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;

//     try {
//         const tenant = await prisma.tenant.findUnique({ where: { id } });

//         if (!tenant) {
//             return res.status(404).json({ message: "Tenant not found" });
//         }

//         const updatedTenant = await prisma.tenant.update({
//             where: { id },
//             data: updateData
//         });

//         res.json(updatedTenant);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

export const updateTenant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: _, ...updateData } = req.body; // Exclude `id` from the update data

    console.log("Received update data:", updateData)

    try {
        const tenant = await prisma.tenant.findUnique({ where: { id } });

        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        const updatedTenant = await prisma.tenant.update({
            where: { id },
            data: updateData,
        });

        console.log("Updated tenant successfully:", updatedTenant)        
        res.json(updatedTenant);
    } catch (err) {
        res.status(500).json({ message: err.message });
        
    }
});

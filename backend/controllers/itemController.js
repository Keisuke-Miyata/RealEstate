import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"

export const createItem = asyncHandler(async (req, res) => {
    const {
        title, condition, address, price, description, image, userEmail
    } = req.body.data || req.body

    try {
        const item = await prisma.item.create({
            data: {
                title,
                condition,
                address,
                price,
                description,
                image,
                owner: {connect: { email: userEmail }}
            }
        })

        res.send({ message: "Residency created successfully", item})
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllItems = asyncHandler(async (req, res) => {
    const items = await prisma.item.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send( items )
})

export const getItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const item = await prisma.item.findUnique({where: { id }})
        res.send(item)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllUserItems = asyncHandler(async (req, res) => {
    const { email } = req.query; // Extract email correctly

    try {
        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required" });
        }

        const items = await prisma.item.findMany({
            where: { owner: { email } }, // Correct where condition
            orderBy: { createdAt: "desc" },
        });

        res.json(items); // Use the correct variable name
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
});

export const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const existingItem = await prisma.item.findUnique({ where: { id } });

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        await prisma.item.delete({ where: { id } });

        res.json({ message: "Tenant deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting item", error: err.message });
    }
});

export const updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, condition, address, price, image, description } = req.body;

    try {
        const existingItem = await prisma.item.findUnique({ where: { id } });

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const updatedItem = await prisma.item.update({
            where: { id },
            data: {
                title,
                condition,
                address,
                price,
                image,
                description,
                updatedAt: new Date()
            }
        });

        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

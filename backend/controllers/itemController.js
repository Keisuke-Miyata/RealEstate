import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"

export const createItem = asyncHandler(async (req, res) => {
    const {
        title, condition, address, price, description, image, userEmail
    } = req.body.data || req.body
    console.log(req.body.data)
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
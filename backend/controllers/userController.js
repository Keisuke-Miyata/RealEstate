import { prisma } from "../config/prismaConfig.js"
import asyncHandler from "express-async-handler"


export const createUser = asyncHandler(async (req, res) => {

    let { email, name } = req.body
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (!userExists) {
        const user = await prisma.user.create({ data: {
            email: email,
            name: name || "",
        },
    })
        res.send({
            message: "User registered successfully",
            user: user,
        })
    }
    else res.status(201).send({ message: "User already registered" })
})

export const getUser = asyncHandler(async (req, res) => {
    const { email } = req.params;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { rid } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (user.favPropertyID.includes(rid)){
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favPropertyID: {
                        set: user.favPropertyID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({ message: "Removed from Favorites", user: updateUser })
        } else {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favPropertyID: {
                        push: rid
                    }
                }
            })

            res.send({ message: "Updated Favourites", user: updateUser })
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllFav = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const fav = await prisma.user.findUnique({
            where: { email },
            select: { favPropertyID: true }
        })
        res.status(200).send(fav)
    } catch (err) {
        throw new Error(err.message)
    }
})

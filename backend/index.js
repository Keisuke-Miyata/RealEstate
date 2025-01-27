import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRoute } from "./routes/userRoutes.js"
import { propertyRoute } from "./routes/propertyRoute.js"
import { tenantRoute } from "./routes/tenantRoute.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use("/api/user", userRoute)
app.use("/api/property", propertyRoute)
app.use("/api/tenant", tenantRoute)
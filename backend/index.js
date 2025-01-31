import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRoute } from "./routes/userRoutes.js"
import { propertyRoute } from "./routes/propertyRoute.js"
import { tenantRoute } from "./routes/tenantRoute.js"
import nodemailer from "nodemailer";
import bodyParser from "body-parser"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_ADDRESS,
        pass: GMAIL_PASSWORD
    }
})

app.post('/send-message', (req, res) => {
    const { email, message, subject } = req.body;

    const mailOptions = {
        from: email,
        to: GMAIL_ADDRESS,
        subject: subject,
        text: message
    };
    console.log(email, message, subject)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message: `Error sending email.`, error: error.toString() });
        }
        res.status(200).json({ message: 'Message sent successfully!', info})
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use("/api/user", userRoute)
app.use("/api/property", propertyRoute)
app.use("/api/tenant", tenantRoute)
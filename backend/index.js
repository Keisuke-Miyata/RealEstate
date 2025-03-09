import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRoute } from "./routes/userRoutes.js"
import { propertyRoute } from "./routes/propertyRoute.js"
import { tenantRoute } from "./routes/tenantRoute.js"
import { itemRoute } from "./routes/itemRoute.js"
import nodemailer from "nodemailer";
import bodyParser from "body-parser"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true
}));

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_ADDRESS,
        pass: GMAIL_PASSWORD
    }
})

app.get("/", (req, res) => {
    res.send("Backend is running")
})

app.post('/send-message', (req, res) => {
    const { email, message, subject, selectedButton } = req.body;

    const updatedMessage = `Category: ${selectedButton}\n\nMessage: ${message}`

    const mailOptions = {
        from: email,
        to: GMAIL_ADDRESS,
        subject: subject,
        text: updatedMessage
    };
    console.log(email, message, subject)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: `Error sending email.`, error: error.toString() });
        }
        res.status(200).json({ message: 'Message sent successfully!', info })
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use("/api/user", userRoute)
app.use("/api/property", propertyRoute)
app.use("/api/tenant", tenantRoute)
app.use("/api/item", itemRoute)
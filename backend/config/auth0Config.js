import { auth } from "express-oauth2-jwt-bearer"

const jwtCheck = auth({
    audience: process.env.AUDIENCE_URL,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: "RS256"
})

export default jwtCheck
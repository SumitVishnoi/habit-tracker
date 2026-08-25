import { verifyToken } from "../config/token.js";
import prisma from "../utils/prisma.js";


export const authenticateUser = async ( req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized error"
            })
        }

        const decode = verifyToken(token)

        req.user = decode.userId

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
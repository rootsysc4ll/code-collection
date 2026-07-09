import jwt, { type JwtPayload, type Secret } from "jsonwebtoken"
import type { Response, NextFunction } from "express"

import { type CustomRequestType } from "../utils/types.ts"

function authMiddleware(req: CustomRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    // checks if the token was provided
    if (!token) {return res.sendStatus(401).send({ message: "No token provided" })}
    
    // checks if the token is valid
    jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
        if (err) {return res.sendStatus(401).send({ message: "Invalid token" })}

        req.userId = (decoded as JwtPayload).id as number
        next()
    })
}

export default authMiddleware
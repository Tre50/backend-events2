import jwt from 'jsonwebtoken';
import { secretKey } from "../creds.js";


export async function isAuthenticated(req, res, next) { 
// check for token

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ message: 'No authorization token found' });
    }

    try {
        //check if token is valid
        const decoded = jwt.verify(authorization, secretKey);
        
        // send token with req
        req.locals = decoded;
        next();
    } catch (err) {
        // if token is not authorized and fails send 401
        return res.status(401).send({ message: 'Invalid authorization token' });
    }
}

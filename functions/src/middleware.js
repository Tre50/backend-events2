import pkg from 'jsonwebtoken';
const { decode, jwt } = pkg;
import { secretKey } from "../creds.js";

export async function isAuthenticated(req, res, next) {
    //FIRST CHECK IF THEY HAVE TOKEN:
    const { authorization } = req.headers;
    if (!authorization) {
    res.status(401).send({ message: 'No authorization token found'});
    return;  
    }
    //THEN CHECK IF TOKEN VALID:
    jwt.verify(authorization, secretKey, (err, decoded) => {
    if(err) {
            res.status(401).send(err);
            return;
    }
    // ATTACH OUR DECODED TOKEN TO THE REQUEST...
    //IF SO GO ON:
    req.locals = decoded;
    next();

   
    });


}
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "./dbConnect.js";
import { secretKey } from "./creds.js";

const coll = db.collection('users');

export async function createUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password || email.length < 6 || password.length < 6) {
            res.status(400).send({ message: 'Invalid user' });
            return;
        }

        const hashedPw = await bcrypt.hash(password, 10);
        await coll.add({ email: email.toLowerCase(), password: hashedPw });
        await login(req, res);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userCol = await coll.where('email', '==', email.toLowerCase()).get();
        const users = userCol.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const user = users.find(user => bcrypt.compareSync(password, user.password));
        if (!user) {
            res.status(400).send({ message: 'Not Authorized; missing or bad email or password.' });
            return;
        }

        delete user.password;

        const token = jwt.sign(user, secretKey);
        res.send({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}

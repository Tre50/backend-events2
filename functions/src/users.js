import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { db } from "./dbConnect.js";
import { key } from "../creds.js";



  


const coll = db.collection('users');

//user signup that gets email/paswword from authentication and stores it in my DB 
//Im using try/catch if any errors occur should be caught 
export async function SignupForm(req, res) {
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
export async function createUser(req, res) { //this creates users and checks their email/password properties
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

export async function login(req, res) { //this is my user login 'GETS' email/password and looks for user in DB
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

        const token = jwt.sign(user, key);
        res.send({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Server Error' });
    }
}

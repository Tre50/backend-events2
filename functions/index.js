
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json())


app.get('/test', (req, res) => { 
   res.send('Is this thing workin?'); 
});





export const api = onRequest(app);
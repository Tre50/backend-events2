
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getAllRecipes, createRecipe, commentRecipe, findRecipe } from "./src/recipes.js";
import { SignupForm, createUser } from "./src/users.js";



const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello Tre")
});
app.get('/recipe', getAllRecipes);

app.post('/recipe', createRecipe);
app.patch('/recipe', createRecipe);
//app.post('/SignupForm', SignupForm)
app.post('/addComment', commentRecipe)
app.post('/adduser',createUser)
app.post('/forum', createRecipe )
app.post('/findRecipe',findRecipe)


export const api = onRequest(app)

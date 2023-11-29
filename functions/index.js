
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getAllRecipes, createRecipe } from "./src/recipes.js";
import { isAuthenticated } from "./src/middleware.js";

//import { createUser, login } from "./src/users.js";

//import { isAuthenticated } from "./src/middleware.js";

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello Tre")
});
app.get('/recipe', getAllRecipes);

app.post('/recipe', createRecipe);
app.patch('/recipe', createRecipe);

export const api = onRequest(app);
//this imports my my modules from firebase and my custom modules
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getAllRecipes, createRecipe, commentRecipe, findRecipe } from "./src/recipes.js";
import { SignupForm, createUser } from "./src/users.js";



const app = express();
//these are routes that with methods - get,post,patch - with corresponding url paths
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

// this is my API endpoint ready to be deployed
export const api = onRequest(app)

//this is my API to my endpoints 

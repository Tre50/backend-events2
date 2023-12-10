import { db } from "./dbConnect.js"



const coll = db.collection('recipe-building');



export async function createRecipe(req, res) {

    let newRecipe = req.body;
    // newRecipe.userId = req.locals.id;
    await coll.add(newRecipe);
    //must send back updated list of recipes
    getAllRecipes(req, res);
}

export async function getAllRecipes(req, res) {
    const recipeColl = await coll.get();
    const recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(recipes);
}

export async function findRecipe(req,res) {
    const recipeColl = await coll.get();
    let recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (!req.body.query) {
        res.send({message:"No query?",body:req.body})
    }
    const query = req.body.query.toLowerCase()
    const result = []
    recipes = recipes.map((recipe)=>{
        if (recipe.id.toLowerCase().includes(query)) {
            result.push(recipe)
        }
    })
    res.send(result)
}

export async function commentRecipe(req, res) {

    const recipeId = req.body.recipeId
    const comment = req.body.comment
    const user = req.body.user
    const recipeRef = db.collection('recipe-building').doc(recipeId)
    const recipe = recipeRef.get()
    const commentobject = { user, comment }
    const comments = recipe.comments ? [...recipe.comments, commentobject] : [commentobject]
    await recipeRef.update({ comments: comments });

    return (

        res.send(200)


    )


}

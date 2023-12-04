import { db } from "./dbConnect.js"


const coll = db.collection('recipes-building');

export async function createRecipe(res, req) {
    let newRecipe = req.body;

    newRecipe.userId = req.locals.id;

    await coll.add(newRecipe);
    //must send back updated list of recipes

    getAllRecipes(req, res);
}
export async function getAllRecipes(req, res) {
    const recipeColl = await coll.get();
    const recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(recipes);

}


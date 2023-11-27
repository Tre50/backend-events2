import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
    credentials: cert(creds),

})





export const db = getFirestore();


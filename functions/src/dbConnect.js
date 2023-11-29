import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { secretKey } from "../creds.js";

initializeApp({
    credential: cert(secretKey),

});


export const db = getFirestore();


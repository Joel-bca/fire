// src/services/firestore.js

import { collection, addDoc, getDocs } from "firebase/firestore";
// IMPORTANT: This path assumes your firebase.js file is one folder up, directly in the 'src' folder.
import { db } from "../firebase"; 

// 📥 1. FETCH DATA: Use this to get your courses (or anything else)
export const fetchAnyData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    // Grabs the data and the unique document ID from Firebase
    const dataList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return dataList;
  } catch (error) {
    console.error(`Error fetching from ${collectionName}:`, error);
    return []; // Returns an empty array if it fails so your app doesn't crash!
  }
};

// 📤 2. SEND DATA: Use this to submit user enrollments (or anything else)
export const sendAnyData = async (collectionName, dataObject) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), dataObject);
    console.log("Success! Document written with ID: ", docRef.id);
    return true; // Returns true so your UI knows it worked
  } catch (error) {
    console.error(`Error writing to ${collectionName}:`, error);
    return false; // Returns false if something went wrong
  }
};
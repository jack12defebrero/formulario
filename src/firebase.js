// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDugL0WNz21IiDMsNhMBtJocbSXF_fjlE8",
  authDomain: "formulario-web-6c036.firebaseapp.com",
  projectId: "formulario-web-6c036",
  storageBucket: "formulario-web-6c036.appspot.com",
  messagingSenderId: "78728737368",
  appId: "1:78728737368:web:bd8c871aa8c8102fc3102d",
  measurementId: "G-Z2J848X8KF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar los datos del formulario en Firestore
export const saveFormData = async (data) => {
  try {
    console.log("Guardando datos en Firestore:", data); // Debug
    const docRef = await addDoc(collection(db, "respuestas"), data);
    console.log("Respuesta guardada con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al guardar la respuesta: ", e);
    throw e; // Asegúrate de lanzar el error para que handleSubmit lo capture
  }
};
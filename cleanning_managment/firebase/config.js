import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDpLYOoi9Cc0alGykoSejeLgY7IGM0I8iU",
  authDomain: "clean-campus-dae8b.firebaseapp.com",
  projectId: "clean-campus-dae8b",
  storageBucket: "clean-campus-dae8b.appspot.com",
  messagingSenderId: "259360547156",
  appId: "1:259360547156:web:39006a1565b9c50155e8c1",
  measurementId: "G-857J8G0HJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Only initialize analytics on the client side
// let analytics = null;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }
// export { analytics };
const db = getFirestore();
export default app;

const handleSubmit = async () => {
  // ...image upload logic...
  await addDoc(collection(db, "reports"), {
    adminId,
    sweeperId,
    location: selectedLocation["location name"],
    description,
    imageBefore: imageUrl,
    status: "Pending",
    timestamp: new Date(),
    // ...other fields...
  });
}; 
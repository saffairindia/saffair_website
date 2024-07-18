// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gestorage = getStorage(app);



// api

// 6Lf1YewpAAAAAE27-KSrUi29qIPNHLXAkYLBItf4
// secret 

// 6Lf1YewpAAAAAGHgwCDhRLikMY4FuaSI9x1FFvDO
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBArH3bgJdZRx5kp8eJgWgS7oVGwNQ2Bz8",
//   authDomain: "test-ca362.firebaseapp.com",
//   projectId: "test-ca362",
//   storageBucket: "test-ca362.appspot.com",
//   messagingSenderId: "1014541983110",
//   appId: "1:1014541983110:web:31cac8ce39ac2ee43ee007",
//   measurementId: "G-7DS999J1Q3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

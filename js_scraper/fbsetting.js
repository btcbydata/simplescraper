import { initializeApp } from "firebase/app";
import { getDatabase, set, update, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3rq7xxnofkGwajV6D62BXGJ4WfF0MIMc",
  authDomain: "fbsimplescraper.firebaseapp.com",
  databaseURL: "https://fbsimplescraper-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fbsimplescraper",
  storageBucket: "fbsimplescraper.appspot.com",
  messagingSenderId: "865553940068",
  appId: "1:865553940068:web:b760ad2a07b362dc796971",
  measurementId: "G-WZPW4DCQGW"
};


// initialize firebase
export const app = initializeApp(firebaseConfig);

// export && initialize realtime database
export const database = getDatabase(app);
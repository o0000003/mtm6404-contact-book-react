import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVaMo2n_BY0z96RUKlWXz49QHo-g1-fhU",
  authDomain: "mtm-contact-book.firebaseapp.com",
  projectId: "mtm-contact-book",
  storageBucket: "mtm-contact-book.firebasestorage.app",
  messagingSenderId: "91845971508",
  appId: "1:91845971508:web:9369d702e18bc99f658461"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

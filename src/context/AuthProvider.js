import { doc, getDoc, getFirestore } from "firebase/firestore";
import { createContext, useState } from "react";
import { myAuth, myFirebase } from "../firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [user, setUser] = useState(null);

  const firestore = getFirestore(myFirebase);

  async function getRole(uid) {
    const docRef = doc(firestore, `users/${uid}`);
    const responseDoc = await getDoc(docRef);
    const finalData = responseDoc.data().role;

    return finalData;
  }

  function setUserWithFirebaseAndRole(userFromFirebase) {
    getRole(userFromFirebase.uid).then((role) => {
      const userData = {
        uid: userFromFirebase.uid,
        email: userFromFirebase.email,
        role: role,
      };
      setUser(userData);
    });
  }

  myAuth.onAuthStateChanged((userFromFirebase) => {
    // Check for user status
    if (userFromFirebase) {
      if (!user) {
        setUserWithFirebaseAndRole(userFromFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider value={{ auth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

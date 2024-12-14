import React, { useContext, useEffect,useState } from 'react'
import {auth} from '../firebase'
const AuthContext = React.createContext()
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser] = useState()

  function signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      // Get the signed-in user
      const user = userCredential.user;

      // Retrieve the user's ID token
      return user.getIdToken().then((token) => {
        // Store the token in localStorage
        localStorage.setItem("token", token);
        return token; // Return the token if needed
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error during login:", error);
      throw error;
    });
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the signed-in user
        const user = userCredential.user;
  
        // Retrieve the user's ID token
        return user.getIdToken().then((token) => {
          // Store the token in localStorage
          localStorage.setItem("token", token);
          return token; // Return the token if needed
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error during login:", error);
        throw error;
      });
  }

  function logout(){
    localStorage.removeItem('token');
    return auth.signOut()
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth,email)
  }
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
    })
    return unsubscribe
  },[])
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
 
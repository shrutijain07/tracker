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
  }
  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logout(){
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
 
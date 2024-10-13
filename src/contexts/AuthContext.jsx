import React, { useContext, useEffect,useState } from 'react'
import {auth} from '../firebase'
const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser] = useState()

  function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password)
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
    })
    console.log('%c [ unsubscribe ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', unsubscribe)
    return unsubscribe
  },[])
  
  const value = {
    currentUser,
    signup
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
 
import React, {useState} from 'react'
import { Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
export default function Dashboard() {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleLogout(){
    setError('')
    try{
      await logout()
      navigate('/login')
    }
    catch(error){
      console.log('%c [ error ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', error)
      setError("Failed to log out")
    }
  }

  return (
    <>
       <Card>
        <Card.Body>
          <Sidebar/>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong>{currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-2">Update Profile</Link>
        </Card.Body>
      </Card>
    </>
  )
}

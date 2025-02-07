import React, { useRef,useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error,setError] = useState('')
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()
      try{
        setError('')
        setloading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/activity')
      }
      catch(error){
        setError('Failed to log in')
      }
      setloading(false)
    }
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Button className='w-100' type="submit" disabled={loading}>Log In</Button>
                <div className="w-100 text-center mt-2">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

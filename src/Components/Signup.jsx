import React, { useRef,useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error,setError] = useState('')
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()
      if(passwordRef.current.value !== confirmPasswordRef.current.value){
        return setError("Passwords do not match")
      }
      try{
        setError('')
        setloading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigate('/dashboard')
      }
      catch(error){
        setError('Failed to create an account')
      }
      setloading(false)
    }
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
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
                <Form.Group id="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                </Form.Group>
                <Button className='w-100' type="submit" disabled={loading}>Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Alerady have an account?<Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

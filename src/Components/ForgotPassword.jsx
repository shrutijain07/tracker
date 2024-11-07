import React, { useRef,useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
      e.preventDefault()
      try{
        setMessage('')
        setError('')
        setloading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your inbox for further instructions')
      }
      catch(error){
        console.log('%c [ error ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', error)
        setError('Failed to reset password')
      }
      setloading(false)
    }
  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Button className='w-100 mt-3' type="submit" disabled={loading}>Reset Password</Button>
                <div className="w-100 text-center mt-2">
                  <Link to="/login">Login?</Link>
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

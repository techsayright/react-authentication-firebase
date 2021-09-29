import React, { useEffect, useRef, useState } from 'react'
import { Alert, Container, Form,Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

export default function Signup() {
    const history = useHistory();
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);
    const inputRef =useRef(null)

    useEffect(()=>{
      inputRef.current.focus();
    },[]);

    const signupHandler =e=>{
      e.preventDefault();

      const {email, password} = e.target.elements;

      if(email.value.trim().length===0 || !email.value.includes('@') || password.value.trim().length===0){
        alert('enter values correctly')
        return;
      }

      setLoading(true);
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMiPPTKQPGGXPQz99FQSoiGP8vhLQvaWc', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          email: email.value,
          password: password.value,
          returnSecureToken: true
        })
      }).then((res)=>{
        if(res.ok){
          //......
          console.log(res)
          setLoading(false)
          history.replace('/login');
        }else{
          res.json().then(data=>{
            setError(data.error.message)
            setLoading(false)
          })
        }
      })
    }
    return (
        <Container>
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
        SignUp Here
      </h3>
      <Form onSubmit={signupHandler}>
        {error && <Alert variant='danger'> 
          {error}
        </Alert>}
        <Form.Group className="mb-3" >
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            id="email"
            ref={inputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
            id="password"
          />
        </Form.Group>

        <Button variant="warning my-2" type="submit" >
          {!loading ?'SignUp' : 'Sending...'}
        </Button>
        <br />

        <h5 className="mx-2 my-2" onClick={() => history.push("/login")}>
          Already Signed Up? Login
        </h5>
      </Form>
    </Container>
    )
}

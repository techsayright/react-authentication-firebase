import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import  AuthContext  from "../store/auth-context";

export default function Login() {
    const history = useHistory();
    const [loading , setLoading]= useState(null);
    const [error , setError]= useState(null);
    const ctx = useContext(AuthContext);
    const inputRef= useRef(null);
  
    useEffect(()=>{
      inputRef.current.focus();
    },[])

    const loginFormHandler=e=>{
      e.preventDefault();

      const {EmailLg , passwordLg} = e.target.elements;

      if(EmailLg.value.trim().length===0 || !EmailLg.value.includes('@') || passwordLg.value.trim().length===0){
        alert('Please Enter value correctly');
        return;
      }

      setLoading(true);
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMiPPTKQPGGXPQz99FQSoiGP8vhLQvaWc', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          email: EmailLg.value,
          password: passwordLg.value,
          returnSecureToken: true
        })
      }).then((res)=>{
        if(res.ok){
          //.....................................
          res.json().then(data=>{
            console.log(data);
            const expireTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
            ctx.login(data.idToken , expireTime.toISOString());
            history.replace('/')
          })
          setLoading(false)
        }else{
          res.json().then(data=>{
            setError(data.error.message)
            setLoading(false)
          })
        }
      })
    }
  return (
    <Container className="loginContainer">
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
        Login Here
      </h3>

      <Form onSubmit={loginFormHandler} >
      {error && <Alert variant='danger'> 
          {error}
        </Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email"
            id="EmailLg"
            ref={inputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your Password"
            id="passwordLg"
          />
        </Form.Group>

        <Button variant="primary my-2" type="submit">
          {!loading? 'Login': 'Signing..'}
        </Button>
        <br />

        <h5 className="mx-2 my-2" onClick={() => history.push("/signup")}>
          New User? SignUp
        </h5>
      </Form>
    </Container>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import  AuthContext  from "../store/auth-context";

export default function UpdatePass() {
  const history = useHistory();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const updatePassHandler = (e) => {
    e.preventDefault();

    if (inputRef.current.value.trim().length === 0) {
      alert("please enter password");
      return;
    }

    setLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAMiPPTKQPGGXPQz99FQSoiGP8vhLQvaWc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: ctx.token,
          password: inputRef.current.value,
          returnSecureToken: false,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        //......
        console.log(res);
        setLoading(false);
        alert('Password Updated');
        history.goBack();
      } else {
        res.json().then((data) => {
          setError(data.error.message);
          setLoading(false);
          inputRef.current.focus();
        });
      }
    });
  };
  return (
    <Container className="loginContainer">
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
        Update Password Here
      </h3>

      <Form onSubmit={updatePassHandler}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>ReCreate Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your New Password"
            id="passwordNew"
            ref={inputRef}
          />
        </Form.Group>

        <Button variant="primary my-2" type="submit">
          {loading ? 'Updating..': 'Update Password'}
        </Button>

        <Button variant="warning mx-4" onClick={() => history.goBack()}>
          Back
        </Button>
      </Form>
    </Container>
  );
}

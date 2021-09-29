import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import '../css/Main.css'
import  AuthContext  from "../store/auth-context";

export default function MainNav() {
  const ctx = useContext(AuthContext);

  const logoutHandler = ()=>{
    ctx.logout();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>React Auth</Navbar.Brand>
        <Nav className="mainNav">
          <NavLink activeClassName="active" to="/home" className='mx-5'>
            Home
          </NavLink>
          {!ctx.isLoggedIn && <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>}
          {!ctx.isLoggedIn && <NavLink activeClassName="active" to="/signup" className="mx-5">
            Create a New Account
          </NavLink>}
          {ctx.isLoggedIn && <NavLink activeClassName="active" to='/home/updatePass'>
            Update Password
          </NavLink>}
          {ctx.isLoggedIn && <Link to='/' onClick={logoutHandler} className="mx-5">
            Logout
          </Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

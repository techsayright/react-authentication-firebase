import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import MainNav from "./Container/MainNav";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AuthContext  from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <div>
      <MainNav />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          path="/home"
          render={() => {
            if (ctx.isLoggedIn) {
              return <Home />;
            } else {
              return (
                <div>
                  <h1 className="text-center my-5 container">
                    Hello User, Please Login to Access our premium page
                  </h1>
                </div>
              );
            }
          }}
        />
        {!ctx.isLoggedIn && <Route path="/login" component={Login} />}
        {!ctx.isLoggedIn && <Route path="/signup" component={Signup} />}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

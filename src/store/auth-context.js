import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;

let logoutTimeOut;
let logoutTimeInterval;
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};


export const AuthContextProvider = (props) => {

  const [tokenId, setTokenId] = useState(localStorage.getItem("token"));

  const logoutHandler = useCallback(() => {
    setTokenId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expires");

    if (logoutTimeOut) {
      clearTimeout(logoutTimeOut);
      clearInterval(logoutTimeInterval);
    }
  }, []);

  

  const loginHandler = (token, expirationTime) => {
    setTokenId(token);
    localStorage.setItem("token", token);

    let remainTime = calculateRemainingTime(expirationTime);

    logoutTimeOut = setTimeout(logoutHandler, remainTime);

    let dummyRemainTime= remainTime;
    logoutTimeInterval=setInterval(()=>{
      dummyRemainTime = dummyRemainTime-3000;
      console.log(dummyRemainTime);
      localStorage.setItem('expires', dummyRemainTime );
    },3000)
  };

  useEffect(()=>{
    if(localStorage.getItem('expires')){
      let remainTime=localStorage.getItem('expires');

      logoutTimeOut = setTimeout(logoutHandler, remainTime);

    let dummyRemainTime= remainTime;
    logoutTimeInterval=setInterval(()=>{
      dummyRemainTime = dummyRemainTime-3000;
      console.log(dummyRemainTime);
      localStorage.setItem('expires', dummyRemainTime );
    },3000)
    }
  },[logoutHandler])

  const contextValue = {
    token: tokenId,
    isLoggedIn: !!tokenId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};



// video vala code-------------------------------
// import React, { useState, useEffect, useCallback } from 'react';

// let logoutTimer;

// const AuthContext = React.createContext({
//   token: '',
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem('token');
//   const storedExpirationDate = localStorage.getItem('expirationTime');

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 3600) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');
//     return null;
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

// export const AuthContextProvider = (props) => {
//   const tokenData = retrieveStoredToken();
  
//   let initialToken;
//   if (tokenData) {
//     initialToken = tokenData.token;
//   }

//   const [token, setToken] = useState(initialToken);

//   const userIsLoggedIn = !!token;

//   const logoutHandler = useCallback(() => {
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');

//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);

//   const loginHandler = (token, expirationTime) => {
//     setToken(token);
//     localStorage.setItem('token', token);
//     localStorage.setItem('expirationTime', expirationTime);

//     const remainingTime = calculateRemainingTime(expirationTime);

//     logoutTimer = setTimeout(logoutHandler, remainingTime);
//   };

//   useEffect(() => {
//     if (tokenData) {
//       console.log(tokenData.duration);
//       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
//     }
//   }, [tokenData, logoutHandler]);

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

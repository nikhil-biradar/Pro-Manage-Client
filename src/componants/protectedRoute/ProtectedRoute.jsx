import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyToken } from "../../api/auth";
import LoadingPage from "../Error/Loading/LoadingPage";

function ProtectedRoute(prop) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { Component } = prop;

  const navigate = useNavigate();

  useEffect(() => {
    tokenValidation();
  }, []);
  const tokenValidation = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      // verifying the token from backend
      try {
        const Response = await verifyToken({ token });
        if(Response)
        {
          setIsLoggedIn(Response);
        }else{     
          toast.error('Not Authorised')   
          navigate('/')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div>{isLoggedIn ? <Component /> : <LoadingPage/>}</div>;
}

export default ProtectedRoute;

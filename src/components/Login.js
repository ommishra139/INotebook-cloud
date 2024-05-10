import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials,setcredentials] = useState({email:"",password:""});
    // const [password,setPassword] = useState("");

    let navigate = useNavigate();


    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
      body: JSON.stringify({email:credentials.email,password:credentials.password}),

          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/home");
            props.showAlert("Logged In Successfully","success")

          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }

    const onChange= (e) =>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

    
  return (
    <div className="mt-3">
      <h2>Login to Continue to INoteBook </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="emial">Email address</label>
          <input
            type="email"
            value={credentials.email}
            className="form-control"
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            // placeholder="Enter email"
          />
         
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={credentials.password}
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
            // placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary my-2" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

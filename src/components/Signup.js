import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {

    const [credentials,setcredentials] = useState({name:"",email:"",password:"",cpassword:""});

    let navigate = useNavigate();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
      body: JSON.stringify({name,email,password}),

          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/home");
            props.showAlert("Account Created Successfully","success")

          }
          else{
            props.showAlert("invalid Details","danger")

          }
          
    }

    const onChange= (e) =>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-2">
            <h2 className="my-3"> Create a account to use INoteBook </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
            aria-describedby="emailHelp"
            // placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
            // placeholder="Enter email"
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength={5}
            required
            // placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength={5}
            required
            // placeholder="Password"
          />
        </div>
       
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const Signup = () => {
  const navigate = useNavigate()
  const {setAlert} = useContext(NoteContext)
  const [signupform,setSignupform] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phoneno: ""
  })

  const handleonchange=(e)=>{
    const {name,value} = e.target
    setSignupform((presState)=>({
      ...presState,
      [name]: value
    }))
  }

  const handlesignup =async (e)=>{
    e.preventDefault()
    const payload = signupform
    try {
      const response = await fetch(`http://localhost:5000/user/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      const result = await response.json();
      if(result.msg==="User already exists"){
       return navigate('/login')
      }
      setAlert({
        type: result.type,
        msg: result.msg
      })
      navigate("/login")
  } catch (error) {
      console.error('Error sending data:', error);
      setAlert({
        type: "danger",
        msg: "Check your internet connection"
      })
  }
  setTimeout(() => {
    setAlert({
      type: "",
      msg: ""
    })
  }, 2000);
  
  }
  return (
    <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="text-center mb-4">
        <h1 className="display-4 text-primary">Sign Up</h1>
        <p className="lead text-muted">Create your account to start using NoteSpot.</p>
      </div>

      <div className="card shadow-lg">
        <div className="card-body p-4">
          <form onSubmit={handlesignup}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Choose a username"
                name="name"
                value={signupform.name}
                onChange={handleonchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={signupform.email}
                onChange={handleonchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create a password"
                name="password"
                value={signupform.password}
                onChange={handleonchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={signupform.password}
                onChange={handleonchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                accept="image/*"
                name="profileimg"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Enter your location"
                name="location"
                value={signupform.location}
                onChange={handleonchange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneno" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneno"
                placeholder="Enter your phone number"
                name="phoneno"
                value={signupform.phoneno}
                onChange={handleonchange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Log In
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Signup;

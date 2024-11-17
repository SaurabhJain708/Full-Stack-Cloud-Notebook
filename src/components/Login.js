import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const Login = () => {
  const navigate = useNavigate()
  const {setAlert,setProfile} = useContext(NoteContext)
  const [loginform,setLoginform] = useState({
    email: "",
    password: ""
  })

  const handleonchange = (e)=>{
    const {name,value} = e.target
    setLoginform((prevState)=>({
      ...prevState,
      [name] : value
    }))
  }

  const handlelogin = async (e)=>{
    e.preventDefault()
    const payload = loginform
    try {
      const response = await fetch(`http://localhost:5000/user/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials:`include`
      });

      const result = await response.json();
      setAlert({
        type: result.type,
        msg: result.msg
      })
      if(result.msg === "Please signup before login"){
         navigate("/signup")
      }
      else if(result.msg === "Please enter valid password"){
         navigate("/login")
      }
      else if(result.msg === "Some error occured"){
        navigate("/login")
      }else{
        // Convert result.createdAt to a Date object
        const date = new Date(result.createdAt);
  
        // Define formatting options
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
        // Create a formatter
        const formatter = new Intl.DateTimeFormat('en-US', options);
  
        // Format the date
        const formattedDate = formatter.format(date);
  
        // Set the profile with formatted date
      setProfile({
        name: result.name,
        email: result.email,
        phoneno: result.phoneno,
        location: result.location,
        createdAt: formattedDate
      })
      navigate("/")
    }
  } catch (error) {
      console.error('Error sending data:', error);
      setAlert({
        type: "danger",
        msg: "Check your internet connection"
      })
  }
  setTimeout(() => {
    setAlert({
      type:"",
      msg:""
    })
  }, 2000);
  }
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary">Log In</h1>
            <p className="lead text-muted">Access your NoteSpot account.</p>
          </div>

          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handlelogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name='email'
                    value={loginform.email}
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
                    placeholder="Enter your password"
                    name='password'
                    value={loginform.password}
                    onChange={handleonchange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" >Log In</button>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const Profile = () => {
  const navigate = useNavigate()
  const {profile, setSamplenotes,setProfile,setAlert} = useContext(NoteContext)

  const handlelogout = async () => {
    try{
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAlert({
        type: result.type,
        msg: result.msg
      })

    }catch(err){
      console.log(err)
      setAlert({
        type: 'danger',
        msg: "Failed to logout"
      })
    }
    navigate('/login');
    setProfile({
      name:"",
      email:"",
      phoneno:"",
      location:"",
      createdAt: ""
    })
    setSamplenotes([])
    setTimeout(() => {
      setAlert({
        type: "",
        msg: ""
      })
    }, 2000);
};


  useEffect(()=>{
    const fetchdata = async()=>{
    try{
      const response = await fetch('http://localhost:5000/note/home', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if(result.msg==='Please login to access website'){
        return navigate('/login')
      }
      setSamplenotes(result.allnotes)
      // Convert result.createdAt to a Date object
      const date = new Date(result.loggedinuser.createdAt);
  
      // Define formatting options
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      // Create a formatter
      const formatter = new Intl.DateTimeFormat('en-US', options);

      // Format the date
      const formattedDate = formatter.format(date);

      // Set the profile with formatted date
      setProfile({
        name: result.loggedinuser.name,
        email: result.loggedinuser.email,
        phoneno: result.loggedinuser.phoneno,
        location: result.loggedinuser.location,
        createdAt: formattedDate
      })
    }catch(err){
      console.log(err)
      setAlert({
        type: "danger",
        msg: "Check your internet connection" 
      })
    }
  }
  fetchdata()
  },[])

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary">Profile</h1>
            <p className="lead text-muted">Manage your profile and settings below.</p>
          </div>

          <div className="card shadow-lg">
            <div className="card-body p-4">
              <div className="row align-items-center mb-4">
                <div className="col-md-4 text-center">
                  <img
                    src="path/to/profile-image.jpg"
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  <h3 className="mt-3">{profile.name}</h3>
                  <p className="text-muted">Joined on: {profile.createdAt}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phoneno}</p>
                  <p><strong>Location:</strong> {profile.location}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/edit-profile" className="btn btn-primary btn-lg">Edit Profile</Link>
                <button type="button" className="btn btn-danger btn-lg" onClick={handlelogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

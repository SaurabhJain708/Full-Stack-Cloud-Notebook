import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
const About = () => {

  const {setSamplenotes, setAlert, setProfile} = useContext(NoteContext);
  
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
      <div className="text-center">
        <h1 className="display-3 text-primary">About NoteSpot</h1>
        <p className="lead text-muted">Your personal space for capturing and organizing ideas</p>
      </div>

      <div className="row align-items-center mt-5">
        <div className="col-md-6">
          <img
            src='/Untitled design (2) (1).png' 
            alt="NoteSpot Illustration"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-dark">Our Mission</h2>
          <p className="text-muted">
            At NoteSpot, we believe that great ideas deserve a great space. Whether you're jotting down quick thoughts or crafting detailed plans, NoteSpot is here to help you stay organized and inspired.
          </p>
          <p className="text-muted">
            Our platform is designed with simplicity and power in mind, offering you a seamless experience in capturing, editing, and managing your notes.
          </p>
          <h2 className="text-dark mt-4">About the Creator</h2>
          <p className="text-muted">
            NoteSpot was created by <strong>Saurabh Jain</strong>, a passionate developer and the founder of <strong>Nakoda Web Solutions</strong>. With a dedication to crafting elegant and user-friendly web applications, Saurabh Jain aims to provide tools that empower people to organize their lives and ideas more effectively.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-primary btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;

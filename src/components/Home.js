import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const Home = () => {
  const navigate = useNavigate()
  const { samplenotes,setShowmodal,setDeletenoteid , setSamplenotes, setAlert, setProfile} = useContext(NoteContext);
  
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


  
  const handledeletemodalopen = (id)=>{
    setDeletenoteid(id)
    setShowmodal(true)
  }
  
  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-4 text-primary">My Notes</h1>
          <Link to="/add-note" className="btn btn-success btn-lg">Add Note</Link>
        </div>
        <div className="row">
          {samplenotes.length===0?"Add a new note":samplenotes.map((elements, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body bg-light">
                  <h5 className="card-title text-primary">{elements.title}</h5>
                  <p className="card-text">{elements.content}</p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/editnote/${elements._id}`} className="btn btn-warning btn-sm">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={()=>handledeletemodalopen(elements._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

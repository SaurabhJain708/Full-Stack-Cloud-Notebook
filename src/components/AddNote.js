import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import { v4 as uuidv4 } from 'uuid';

const AddNote = () => {
  const navigate = useNavigate()
  const {samplenotes,setSamplenotes,setAlert, setProfile} =useContext(NoteContext)
  const [addformvalue, setAddformvalue] = useState({
    title: "",
    content: "",
  });

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setAddformvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  },[samplenotes])


  const handleaddform = async (e) => {
    e.preventDefault()
    const addednote = samplenotes.concat({
      title: addformvalue.title,
      content: addformvalue.content,
      id: uuidv4(),
    })
    const payload = addformvalue; 

        try {
            const response = await fetch('http://localhost:5000/note/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            const result = await response.json();
            setAlert({
              type: result.type,
              msg: result.msg
            })

        } catch (error) {
            console.error('Error sending data:', error);
            setAlert({
              type: "danger",
              msg: "Check your internet connection"
            })
        }
    setSamplenotes(addednote) 
    setTimeout(()=>{
      setAlert({
        type:"",
        msg:""
      })
    },2000)
    navigate("/")
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary">Add New Note</h1>
            <p className="lead text-muted">
              Fill out the form below to create a new note.
            </p>
          </div>

          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handleaddform}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Note Title"
                    value={addformvalue.title}
                    name="title"
                    onChange={handleonchange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="6"
                    placeholder="Note content here..."
                    value={addformvalue.content}
                    name="content"
                    onChange={handleonchange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Link to="/" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Add Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
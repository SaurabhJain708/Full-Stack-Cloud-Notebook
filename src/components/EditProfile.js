import React, { useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";

const EditProfile = () => {
  const { profile, setProfile, setAlert, setSamplenotes } = useContext(NoteContext);
  const navigate = useNavigate()
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState)=>({
      ...prevState,
      [name] : value
    }))
  }
    const handleeditprofile =async (e)=>{
      e.preventDefault()
      const payload = {
        name: profile.name,
        email: profile.email,
        phoneno: profile.phoneno,
        location: profile.location,
      }; 

        try {
            const response = await fetch(`http://localhost:5000/user/edit`, {
                method: 'PATCH',
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
      setTimeout(() => {
        setAlert({
          type: "",
          msg: ""
        })
      }, 2000);
      navigate("/profile")
    }

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
            <h1 className="display-4 text-primary">Edit Profile</h1>
            <p className="lead text-muted">
              Update your profile information below.
            </p>
          </div>

          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handleeditprofile}>
                <div className="text-center mb-4">
                  <img
                    src="path/to/profile-image.jpg" // Replace with the actual path to the profile image
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="mt-3">
                    <label htmlFor="profileImage" className="form-label">
                      Change Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="profileImage"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="name"
                    value={profile.name}
                    onChange={handleonchange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example.123@example.com"
                    name="email"
                    value={profile.email}
                    onChange={handleonchange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="(123) 456-7890"
                    name="phoneno"
                    value={profile.phoneno}
                    onChange={handleonchange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="New York, USA"
                    name="location"
                    value={profile.location}
                    onChange={handleonchange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/profile" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
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

export default EditProfile;

import React, { useContext , useState , useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const NoteDetail = () => {
  const {id} = useParams()
  const history = useNavigate()
  const {samplenotes, setSamplenotes, setAlert, setProfile} = useContext(NoteContext)
  console.log(id)
  const note = samplenotes.find((elem) => elem._id == id);
  console.log(note)

  
  const [formvalue,setFormvalue] = useState({
    title: note.title,
    content: note.content,
  })

  const handleonchange = (e)=>{
    const {name,value} = e.target
    setFormvalue((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const handleeditnote =async (e)=>{
    e.preventDefault()
    const editednotes = samplenotes.map((notes)=>{
     return notes._id===note._id?{...notes,title:formvalue.title,content:formvalue.content}:notes
    })
    setSamplenotes(editednotes)
    const payload = formvalue; 

        try {
            const response = await fetch(`http://localhost:5000/note/edit/${id}`, {
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
    history("/")
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
        return history('/login')
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
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary">Note Details</h1>
            <p className="lead text-muted">View and edit your note below.</p>
          </div>

          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handleeditnote}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Note Title"
                    value={formvalue.title}
                    name='title'
                    onChange={handleonchange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="6"
                    name='content'
                    placeholder="Note content here..."
                    value={formvalue.content}
                    onChange={handleonchange}
                    required
                  >
                  </textarea>
                </div>
                <div className="mb-3">
                  <p><strong>Date Created:</strong> August 19, 2024</p>
                  <p><strong>Time Created:</strong> 10:30 AM</p>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to="/" className="btn btn-secondary">Back to Notes</Link>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

const DeleteModal = () => {
    const {showmodal,setShowmodal,samplenotes,setSamplenotes, deletenoteid,setAlert} = useContext(NoteContext)
    const handleclosemodal = ()=>{
        setShowmodal(false)
    }

    const handledeletenote = async () => {
      const updatednotes = samplenotes.filter((note) => note._id != deletenoteid);
      setSamplenotes(updatednotes);
      setShowmodal(false);
    
      await fetch(`http://localhost:5000/note/delete/${deletenoteid}`, {
        method: "DELETE",
        credentials: "include", 
      })
        .then((response) => response.json())
        .then((data) => {
          setAlert({
            type: data.type,
            msg: data.msg,
          });
        })
        .catch((error) => {
          setAlert({
            type: "danger",
            msg: "Check your internet connection",
          });
        });
    
      setTimeout(() => {
        setAlert({
          type: "",
          msg: "",
        });
      }, 2000);
    };
    
  return (
    <>
    {showmodal && (
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleclosemodal}></button>
          </div>
          <div className="modal-body">
            Do you really want to delete this note ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleclosemodal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handledeletenote}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

 </>
  )
}

export default DeleteModal

import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const [samplenotes,setSamplenotes] = useState([])

      const [profile,setProfile] = useState({
        name:"",
        email:"",
        phoneno:"",
        location:"",
        createdAt: ""
      })

      const [alert,setAlert] = useState({
        type:"",
        msg:""
      })

      const [deletenoteid,setDeletenoteid] = useState(null)
      const [showmodal,setShowmodal] = useState(false)
    return (
        <NoteContext.Provider value={{samplenotes,setSamplenotes,profile,setProfile,alert,setAlert,showmodal,setShowmodal,deletenoteid,setDeletenoteid}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
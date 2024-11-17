import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

const Alert = () => {
    const {alert} = useContext(NoteContext)
  return (
    <div>
      <div className={`alert alert-${alert.type}`} role="alert">{alert.msg}</div>
    </div>
  )
}

export default Alert

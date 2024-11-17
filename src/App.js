import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteDetail from './components/Notedetails';
import AddNote from './components/AddNote';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Signup from './components/Signin';
import Login from './components/Login';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import DeleteModal from './components/DeleteModal';
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert/>
    <DeleteModal/>
    <div>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/editnote/:id' element={<NoteDetail/>}/>
      <Route path='/add-note' element={<AddNote/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/edit-profile' element={<EditProfile/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

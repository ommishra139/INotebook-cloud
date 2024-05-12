import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Alert from "./components/Alert";
import About from "./components/About";
import { BrowserRouter,
   Routes,
  Route,
  HashRouter} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";



function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    
    <>
    <NoteState>
      
      <BrowserRouter basename="/home">
        <Navbar />
        
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
        <Route exact path="/home" element={<Home showAlert={showAlert}/>}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/Login" element={<Login showAlert={showAlert}/>}/>
        <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
      </BrowserRouter>
      
      </NoteState>
      {/* <h1>This is Home page of notebook </h1> */}
    </>
  );
}

export default App;

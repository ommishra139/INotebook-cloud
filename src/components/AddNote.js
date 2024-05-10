import React,{ useContext,useState } from "react";
import NoteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const[note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    props.showAlert("Added Successfully","success");

    }
    const onChange= (e) =>{

        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container">
        <h1>Add a Note</h1>
        <form className="container ">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
            //   placeholder="Enter email"
            value ={note.title} onChange={onChange}  minLength={5} required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
            //   placeholder="Password"
            value ={note.description} onChange={onChange} minLength={5} required/>
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
            //   placeholder="Password"
            value ={note.tag} onChange={onChange} minLength={5} required/>
          </div>
          
          <button disabled={note.title.length <5 || note.description.length<5 } type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;

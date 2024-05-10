import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;

  let navigate = useNavigate();


  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();

    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);



  const[note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag:currentNote.tag});
  };
  const handleClick = (e) =>{
    // console.log("Updateing note..",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");

   
}
const onChange= (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
}

  // const ref = useRef(null)
  return (
    <>
      <AddNote showAlert={props.showAlert} />

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* //form from add notes */}
        <form className="container ">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
            value={note.etitle}
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
            //   placeholder="Enter email"
            onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
            value={note.edescription}
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
            //   placeholder="Password"
            onChange={onChange}minLength={5} required />
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
            value={note.etag}
              type="text"
              className="form-control"
              id="etag"
              name="etag"
            //   placeholder="Password"
            onChange={onChange}/>
          </div>
          
        
        </form>

      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length <5 || note.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h1>You Notes</h1>
        <div className="container mx-2">
          {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

import React ,{useContext} from "react";
import NoteContext from "../context/notes/noteContext"


const Noteitems = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      {/* {note.title}
      {note.description} */}
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title} </h5>{" "}
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                props.showAlert("Delete Successfully","success");}}></i>
            <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>

          <p className="card-text">{note.description}</p>
          {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
        </div>
      </div>
    </div>
  );
};

export default Noteitems;

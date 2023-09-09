import { useState  } from "react"
import cross from './assets/images/icon-cross.svg'


export default function Note(props){

    const [note,setNote]=useState({id:"",
                                  body:"",
                                   isSelected : false})
    return (
        <div className={props.darkMode?"dark card":"card"}>
            <button onClick={()=>props.handleCheckbox(props.id)} className={props.isSelected? "checkbox-btn selected":"checkbox-btn"} ></button>
            
           <p className={props.isSelected? "note-body-selected":""}>{props.body}</p> 
           <img onClick={()=> props.deleteNote(props.id)} src={cross} className="cross-img"></img>
            </div>
    )
}

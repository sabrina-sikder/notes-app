import { useState } from 'react'
import Note from './Note'
import sun from './assets/images/icon-sun.svg'
import moon from './assets/images/icon-moon.svg'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { useEffect } from 'react'
import FilterBar from './FilterBar';





function App() {
  
  const [notesArray, setNotesArray] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [filter,setFilter] = useState('all')
  const [darkMode,setDarkMode] = useState(true)

  const setAll = ()=> setFilter('all')
  const setActive=() => setFilter('active')
  const setCompleted=() => setFilter('completed')
    
  

  function getCompletedNotes(){
    return notesArray.filter(note=>note.isSelected)
  }

  function clearCompletedNotes(){
    setNotesArray(prevNotesArray=> 
      prevNotesArray.filter(note => !note.isSelected))
  }

  function getActiveNotes(){
    return notesArray.filter(note=>!note.isSelected)
  }

  function handleCheckbox(id){
    setNotesArray(prevNotesArray =>{
      return prevNotesArray.map((note) =>{
        return note.id === id ?{...note,isSelected:!note.isSelected}:note    
      })
    })   
}

function deleteNote(id){
  setNotesArray(prevNotesArray=> {
    return prevNotesArray.filter(note=>{
      return note.id != id
    }) 
  })
}


function renderNote(array){
  if(array.length > 0){
    const allNotes = array.map(note =>{
      return <Note body={note.body}
                   key={note.id} 
                   id={note.id} 
                   isSelected={note.isSelected} 
                   handleCheckbox={handleCheckbox}
                   deleteNote={deleteNote}
                   darkMode={darkMode}
                   /> 
    })
    return allNotes
  }
  
}


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesArray))
  }, [notesArray])

  
  function handleKey(event){
    if(event.key==='Enter'){
       addNote()
   }
 }


  function toggleDarkMode(){
    setDarkMode(prevState => !prevState)
    console.log('clicked')
  }

  function addNote(){
    const newNote ={
      id:uuidv4(),
      body:document.getElementById('note-input').value,
      isSelected:false
    }

    setNotesArray(prevNotesArray =>  
      [newNote,...prevNotesArray]
    )
    document.getElementById('note-input').value=""

  
  }

  
  

  return (
  <div>
    <div className={darkMode?"dark-header header":"header light-header"}>
    <h1>TODO</h1>
    <button className="toggle-btn" onClick={toggleDarkMode}><img src={darkMode?sun:moon}></img></button>
    </div>

    <div className={darkMode?"dark-container container":"container"}>
        <input id='note-input' onKeyDown={handleKey} 
        className={darkMode?"dark-grey card":"card"} type="text" name='inputField' 
        placeholder="Create a new todo..." ></input>
        
        {notesArray.length>0
                &&
        
        <div className={darkMode?"dark-grey notes-container":"notes-container"}>
          
          {filter==='all'?renderNote(notesArray)
            :filter==="completed"?renderNote(getCompletedNotes())
            :renderNote(getActiveNotes())
            }
          <div className="notes-info-bar">
            <span>{`${getActiveNotes().length} items left`}</span>
            <button onClick={clearCompletedNotes} className="clear-btn">clear completed</button>
          </div>
          <FilterBar all={setAll} active={setActive} completed={setCompleted} darkMode={darkMode} />
        </div>
        
          }

    </div> 
  </div>
  )
}

export default App

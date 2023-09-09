import { useState } from 'react'

export default function FilterBar(props){

    return(
        <div className="filter-bar" >
           <button className="filter-btn" onClick={props.all}>All</button>
           <button className="filter-btn" onClick={props.active}>Active</button>
           <button className="filter-btn" onClick={props.completed}>Completed</button>     
        </div>
    )
}
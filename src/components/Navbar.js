import React from "react";

export default function Navbar(props){
    return(
        <section className="navbar">
            <h1><i className="fas fa-list-check"></i> My To-Do Lists</h1>
            {props.todos.length > 0 && <button className="addtodo-btn addicon-btn" onClick={props.addNewTodo}><i className="fas fa-plus"></i></button>}
        </section>
    );
}
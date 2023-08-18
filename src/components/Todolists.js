import React from "react";

export default function Todolists(props){
    const todoList = props.data.todos.map(todo => {
        return <div className="todo" key={props.data.title + todo.title}><input type="checkbox" id={props.data.title + todo.title} name={todo.title} onChange={(event) => props.handleCheck(event, props.data.id)} checked={todo.completed} /><label htmlFor={props.data.title + todo.title}>{todo.title}</label><i className="fas fa-trash-alt" onClick={(event) => props.deleteTodoItem(event, props.data.id, todo.title)}></i></div>;
    });

    return(
        <section className="todolists-section">
            <input type="text" name="todo-title" maxLength={50} onChange={(event) => props.titleChange(event, props.data.id)} value={props.data.title} placeholder="To-Do List Title" />
            <div className="todolists-add">
                <span>
                    <button className="addicon-btn" onClick={props.toggleShow}><i className={!props.showAdd ? "fas fa-plus" : "fas fa-times"}></i></button>
                    <span>{props.showAdd ? "Close" : "Add"} New To-Do Item</span>
                </span>
                <span>
                    {props.showAdd && <input type="text" className="add-todo-input" onChange={props.newTodoChange} maxLength={100} placeholder="Your New To-Do Item" value={props.newTodoItem} />}
                    {props.showAdd && <button className="btn" onClick={() => props.addNewTodoItem(props.data.id)}>Add</button>}
                </span>
            </div>
            {props.data.todos.length > 0 && <p className="todolists-status">{props.completed} / {props.data.todos.length} Completed To-Do Item{props.data.todos.length > 1 ? "s" : ""} {props.data.todos.length === props.completed && <i className="fas fa-check"></i>}</p>}
            <div className="todolists-wrapper">
                <div className="todolists">
                    {todoList}
                </div>
                {props.data.todos.length > 0 && <div className="todolists-options">
                    <button className="btn" onClick={() => props.clearAllTodos(props.data.id)}>Clear All</button>
                    <button className="btn" onClick={() => props.clearCompleted(props.data.id)}>Clear Completed</button>
                </div>}
            </div>
        </section>
    );
}
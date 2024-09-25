import React from "react";

export default function Navbar(props) {
  return (
    <section className="navbar">
      <h1>
        <i className="fas fa-list-check"></i> My To-Do Lists
      </h1>
      {props.todos.length > 0 && (
        <button className="addtodo-btn addicon-btn" onClick={props.addNewTodo}>
          <i className="fas fa-plus"></i>
        </button>
      )}
      <div className="checkbox-wrapper">
        <div className="checkbox-text">Dark Mode</div>
        <input
          className="tgl tgl-skewed"
          id="cb3-8"
          type="checkbox"
          checked={props.darkMode}
          onChange={props.toggleDarkMode}
        />
        <label
          className="tgl-btn"
          data-tg-off="OFF"
          data-tg-on="ON"
          htmlFor="cb3-8"
        ></label>
      </div>
    </section>
  );
}

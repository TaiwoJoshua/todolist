import React from "react";

export default function Sidetodos(props) {
  return (
    <section className="sidetodos">
      <ul>
        {props.data}
        {props.data.length > 1 && (
          <div className="emptytodo-wrappper">
            <button onClick={props.emptyTodo}>
              <i className="fas fa-trash-alt"></i> Empty To-Do List
            </button>
          </div>
        )}
      </ul>
    </section>
  );
}

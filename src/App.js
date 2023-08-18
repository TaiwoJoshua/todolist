import React from 'react';
import Navbar from './components/Navbar';
import Sidetodos from './components/Sidetodos';
import Todolists from './components/Todolists';
import allQuotes from './quotes';
import {nanoid} from 'nanoid';

export default function App() {
  const [showAdd, setShowAdd] = React.useState(false);
  const [todos, setTodos] = React.useState(() => JSON.parse(localStorage.getItem("teejayMyTodos")) || []);
  const [currTodos, setCurrTodos] = React.useState(todos[0] || {todos: []});
  const [newTodoItem, setNewTodoItem] = React.useState("");
  const [completed, setCompleted] = React.useState(0);
  const [quotes, setQuotes] = React.useState(allQuotes);
  const [currQuote, setCurrQuote] = React.useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [showQuote, setShowQuote] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem("teejayMyTodosDarkMode") ? JSON.parse(localStorage.getItem("teejayMyTodosDarkMode")) : ((window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches));
  });

  function toggleShowAdd(){
    setShowAdd(oldShowAdd => !oldShowAdd);
  }

  function removeActive(){
    const array = document.getElementsByClassName("todoList");
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.classList.contains("active")){
        element.classList.remove("active");
      }
    }
  }

  function changeCurrTodo(id){
    removeActive();
    setTodos(oldTodos => {
      const updateTodos = [];
      for (let i = 0; i < oldTodos.length; i++) {
        oldTodos[i].id === id ? updateTodos.unshift(oldTodos[i]) : updateTodos.push(oldTodos[i]);
      }
      return updateTodos;
    })

    document.getElementById("title" + id).classList.add("active");
    todos.map(todo => {
      if(todo.id === id){
        setCurrTodos(todo);
      };
      return todo;  
    })
  }

  function handleCheck(event, id){
    const {name, checked} = event.target;
    const newTodos = todos.map(todo => {
      if(todo.id === id){
        const newTodo = todo.todos.map(tod => {
          if(tod.title === name){
            return {...tod, completed: checked};
          }else{
            return tod;
          }
        });
        return {...todo, todos: newTodo};
      }else{
        return todo;
      }
    });
    setTodos(newTodos);
  }

  function newTodoChange(event){
    const {value} = event.target;
    setNewTodoItem(value);
  }

  function addNewTodoItem(id){
    if(newTodoItem !== ""){
      const newTodos = todos.map(todo => {
        if(todo.id === id){
          return {...todo, todos: [{title: newTodoItem, completed: false}, ...todo.todos]} 
        }else{
          return todo;
        };
      });
      setTodos(newTodos);
      setNewTodoItem("");
      setShowAdd(false);
    }
  }

  function deleteTodoItem(event, id, title){
    event.stopPropagation();
    setTodos(oldTodos => {
      return oldTodos.map(oldTodo => {
        if(oldTodo.id === id){
          const newTodo = [];
          for (let i = 0; i < oldTodo.todos.length; i++) {
            const element = oldTodo.todos[i];
            if(element.title !== title){
              newTodo.push(element);
            }
          }
          return {...oldTodo, todos: newTodo};
        }else{
          return oldTodo
        }
      })
    });
  }

  function deleteTodo(event, id){
    event.stopPropagation();
    const newTodos = todos.filter(oldTodo => oldTodo.id !== id);
    setTodos(newTodos);
    setCurrTodos(newTodos[0]);
  }

  function titleChange(event, id){
    const {value} = event.target;
    setTodos(oldTodos => oldTodos.map(todo => todo.id === id ? {...todo, title: value} : todo));
  }

  function clearCompleted(id){
    setTodos(oldTodos => {
      return oldTodos.map(oldTodo => {
        if(oldTodo.id === id){
          const newTodo = [];
          for (let i = 0; i < oldTodo.todos.length; i++) {
            const element = oldTodo.todos[i];
            if(!element.completed){
              newTodo.push(element);
            }
          }
          return {...oldTodo, todos: newTodo};
        }else{
          return oldTodo
        }
      })
    });
  }

  function clearAllTodos(id){
    setTodos(oldTodos => {
      return oldTodos.map(oldTodo => {
        if(oldTodo.id === id){
          return {...oldTodo, todos: []};
        }else{
          return oldTodo
        }
      })
    });
  }

  function emptyTodo(){
    setTodos([]);
  }

  function addNewTodo(){
    const newTodos = [{id: nanoid(), title: "New To-Do List (Change Subject)", todos: []}, ...todos]
    setTodos(newTodos);
    setCurrTodos(newTodos[0]);
    setShowAdd(false);
  }

  function firstNewTodo(){
    const newTodos = [{id: nanoid(), title: "New To-Do List (Change Subject)", todos: []}]
    setTodos(newTodos);
    setCurrTodos(newTodos[0]);
    setShowAdd(false);
  }

  function toggleDarkMode(){
    setDarkMode(oldDarkMode => !oldDarkMode);
  }

  function checkCompleted(currTodos){
    let total = 0;
    for (let i = 0; i < currTodos.todos.length; i++) {
        const element = currTodos.todos[i];
        if(element.completed){
            total++;
        }
    }
    if(total === currTodos.todos.length){
      return total > 0 ? true : false;
    };
  }

  React.useEffect(() => {
    localStorage.setItem("teejayMyTodos", JSON.stringify(todos));
    todos.length > 0 && todos.map(todo => {
      if(todo.id === currTodos.id){
        setCurrTodos(todo);
      }
      return todo;
    });
    todos.length > 0 && removeActive();
    todos.length > 0 && document.getElementById("title" + currTodos.id).classList.add("active");
  }, [currTodos, todos]);

  React.useEffect(() => {
    setQuotes(quotes);

    const interval = setInterval(() => {
      const randNum = Math.floor(Math.random() * quotes.length);
      setShowQuote(oldShowQuote => !oldShowQuote);
      setTimeout(() => {
        setCurrQuote(quotes[randNum]);
        setShowQuote(oldShowQuote => !oldShowQuote);
      }, 500);
    }, 10000);
    
    return () => {clearInterval(interval)};
  }, [quotes]);

  React.useEffect(() => {
    let total = 0;
    for (let i = 0; i < currTodos.todos.length; i++) {
        const element = currTodos.todos[i];
        if(element.completed){
            total++;
        }
    }
    setCompleted(total);
  }, [currTodos.todos]);

  React.useEffect(() => {
    localStorage.setItem("teejayMyTodosDarkMode", darkMode);
  }, [darkMode]);

  const titleTodos = todos.length > 0 && todos.map(todo => <div key={`title${todo.id}`} onClick={() => changeCurrTodo(todo.id)}><li id={`title${todo.id}`} className='todoList'><span><div className={checkCompleted(todo) ? "fas fa-check" : ""}> <span style={{color: darkMode ? "white" : "black"}}>{todo.title}</span></div></span> <span className="trash-wrapper"><i className="fas fa-trash-alt" onClick={(event) => deleteTodo(event, todo.id)}></i></span></li><hr/></div>);

  return (
    <div className={darkMode ? "App darkMode" : "App"}>
      <Navbar addNewTodo={addNewTodo} todos={todos} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className='quotes'><i style={{color: showQuote ? darkMode ? "white" : "black" : "transparent"}}>{currQuote}</i></div>
      {todos.length > 0
      ? 
      <main className="main">
          <Sidetodos data={titleTodos} emptyTodo={emptyTodo} total={currTodos.todos.length} completed={completed} />
          <section className="vertical-gap"></section>
          <Todolists 
            data={currTodos} 
            toggleShow={toggleShowAdd} 
            showAdd={showAdd} 
            handleCheck={handleCheck} 
            newTodoChange={(event) => newTodoChange(event)} 
            newTodoItem={newTodoItem} 
            addNewTodoItem={addNewTodoItem}
            deleteTodoItem={deleteTodoItem}
            titleChange={titleChange}
            clearCompleted={clearCompleted}
            clearAllTodos={clearAllTodos}
            completed={completed}
          />
      </main>
      :
      <main className='no-todos'>
        <h1>Your To-Do List is Empty</h1>
        <button className="first-todo" onClick={firstNewTodo}>Create New To-Do</button>
      </main>
      }
    </div>
  );
}
import {useRef} from 'react';
import { useState } from 'react';

function TodoForm({onAddTodo}){
  const [workingTodoTitle, setworkingTodoTitle] = useState("");
  const todoTitleInput = useRef("");

  function handleAddTodo(event){
    event.preventDefault();
    
    onAddTodo(workingTodoTitle);
    setworkingTodoTitle(""); 
    todoTitleInput.current.focus()
  }

 
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input id="todoTitle" name="title" ref={todoTitleInput} 
              value={workingTodoTitle} onChange= {(event) => setworkingTodoTitle(event.target.value)}
            /> 

            <button disabled={workingTodoTitle ===""} >Add Todo</button>
        </form>
    )
}

export default TodoForm
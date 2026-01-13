import {useRef} from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

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
            <TextInputWithLabel 
             elementId={"todoTitle"}
             labelText={"Todo"}
             ref={todoTitleInput} 
             value={workingTodoTitle} 
             onChange= {(event) => setworkingTodoTitle(event.target.value)}
            />
            

            <button disabled={workingTodoTitle ===""} >Add Todo</button>
        </form>
    )
}

export default TodoForm
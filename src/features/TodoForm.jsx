import {useRef} from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({onAddTodo, isSaving}){
  const [workingTodoTitle, setworkingTodoTitle] = useState("");
  const todoTitleInput = useRef("");

  function handleAddTodo(event){
    event.preventDefault();
    
     const newTodo = {
      title: workingTodoTitle,
      isCompleted: false,
      };

    onAddTodo(newTodo);
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
            <button disabled={workingTodoTitle ===""} >
              {isSaving ? 'Saving...' : 'Add Todo'}
              </button>
        </form>
    )
}

export default TodoForm
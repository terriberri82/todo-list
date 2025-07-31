import { useState } from 'react';
import './App.css';
import TodoList from './ToDoList';
import TodoForm from './TodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('Current Todo')

  return (
     <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
      
      
    </div>
  )
}

export default App

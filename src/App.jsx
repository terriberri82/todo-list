
import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
function App() {

  //state//
  const [todoList, setTodoList]= useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [isSaving, setIsSaving] = useState(false);

  //handlers//
  //Add Todo//
  const addTodo = async(newTodo) =>{
     const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try{
      setIsSaving(true);
      const resp = await fetch(url, options);
        if (!resp.ok){
          throw new Error(resp.status)
         };
        const {records} = await resp.json();
        const savedTodo ={
        id: records[0].id,
         ...records[0].fields, 
        }
       if (!records[0].fields.isCompleted) {savedTodo.isCompleted = false;};

       setTodoList([...todoList, savedTodo]);
    }catch(error){
        console.log(error);
        setErrorMessage(error.message)
    }finally {
      setIsSaving(false)
    }
    
  }

  //Complete Todo////
  const completeTodo = async(id) =>{
    const originalTodo = todoList.find(
    (todo) => todo.id === id
     );
    
   const payload = {
    records: [
        {
            id: id,
            fields: {
                isCompleted: true,
            },
        },
    ],
   };

   const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

     const updatedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          return {...todo, isCompleted:true};
        }
        return todo
     });
     setTodoList(updatedTodos);

    try{
      setIsSaving(true);
      
       const resp = await fetch(url, options);
       if (!resp.ok){
          throw new Error(resp.status)
         };
    }catch(error){
       console.log(error);
       setErrorMessage(`${error.message}. Reverting todo...`);

       const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
        return originalTodo;
      }
      return todo
      });
      setTodoList([...revertedTodos]);
    }finally{
      setIsSaving(false);
    };
    }
   
    

//Update Todo///////
  const updateTodo = async(editedTodo) => {
    const originalTodo = todoList.find(
    (todo) => todo.id === editedTodo.id
     );

    const payload = {
    records: [
        {
            id: editedTodo.id,
            fields: {
                title: editedTodo.title,
                isCompleted: editedTodo.isCompleted,
            },
        },
    ],
   };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    const updatedTodos = todoList.map((todo) =>{
      if (todo.id === editedTodo.id){
        return {...editedTodo};
      }
      return todo
    });
    setTodoList(updatedTodos);

    try{
      setIsSaving(true);
       const resp = await fetch(url, options);
       if (!resp.ok){
          throw new Error(resp.status)
         };
    }catch(error){
       console.log(error);
       setErrorMessage(`${error.message}. Reverting todo...`);

       const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
        return originalTodo;
      }
      return todo
      });
      setTodoList([...revertedTodos]);
    }finally{
      setIsSaving(false);
    };
  }

  //useEffect//
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
         method: 'GET',
         headers: {"Authorization": token}
      }
      try {
        const resp = await fetch(url, options);
        if (!resp.ok){
          throw new Error(resp.message)
        };
        const response = await resp.json();
        const fetchedTodos = response.records.map((record) =>{
          const todo = {
            id: record.id, 
            ...record.fields,
          };
          if (todo.isCompleted === undefined) {
               todo.isCompleted = false;
                } return todo
        })
        setTodoList(fetchedTodos)
        }
      catch (error) {
      setErrorMessage(error.message);
     } finally {
      setIsLoading(false);
     } 
    };
    fetchTodos();
   }, [])
    
  
    //return  JSX//
    return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
      
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}  isLoading={isLoading}
      />
      {errorMessage !== "" &&
        <>
         <hr/>
         <p>{errorMessage}</p>
         <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </>
        }
    </div>
  )
}

export default App

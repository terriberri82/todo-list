import { useReducer } from 'react';
import { reducer as todosReducer, initialState as initialTodoState, actions } from './reducers/todos.reducer';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';
import styles from "./App.module.css";


 const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
 
function App() {
  //state//
  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);
 
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

   //State no londer defined now in reducer
   //const [todoList, setTodoList]= useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [errorMessage , setErrorMessage] = useState("");
 //const [isSaving, setIsSaving] = useState(false);

const encodeUrl = useCallback(()=>{
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = "";
  if(queryString){
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
 },[sortDirection, sortField, queryString]);
 
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
      //replaced setIsSaving(true) with startRequest dispatch
      dispatch({ type: actions.startRequest });
      const resp = await fetch(encodeUrl(), options);
        if (!resp.ok){
          throw new Error(resp.status)
         };
        const {records} = await resp.json();
        //replaced savedTodo and setTodoList with disptach
        dispatch({type: actions.addTodo,record: records[0],});
    }catch(error){
        console.log(error);
        //replaced setErrorMessage with dispatch
      dispatch({type: actions.setLoadError,error,});
    }finally {
      //replaced setIsSaving(false) with endRequest Dispatch
      dispatch({ type: actions.endRequest });
    }
    
  }

  //Complete Todo////
  const completeTodo = async(id) =>{
    const originalTodo = todoState.todoList.find(
    (todo) => todo.id === id
     );
    if (!originalTodo) return;
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
      //replaced updatedTodos with dispatxh for completeTodo
     dispatch({ type: actions.completeTodo, id });

    try{
      //replaced setIsSaving(true) with startRequest dispatch
      dispatch({ type: actions.startRequest });
      
       const resp = await fetch(encodeUrl(), options);
       if (!resp.ok){
          throw new Error(resp.status)
         };
    }catch(error){
       console.log(error);
       //replaced setErrorMessage with dispatch and added error message for reverting Todo
      dispatch({type: actions.setLoadError,error: new Error(`${error.message}. Reverting todo...`),});
      //replaced revertedTodo with dispatch for revertedTodo
      dispatch({type: actions.revertTodo,originalTodo,}); 
    }finally{
      //replaced setIsSaving(false) with endRequest Dispatch
      dispatch({ type: actions.endRequest });
    };
    }
   
    

//Update Todo///////
  const updateTodo = async(editedTodo) => {
    const originalTodo = todoState.todoList.find(
    (todo) => todo.id === editedTodo.id
     );
     if (!originalTodo) return;
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
     
    //replace updatedTodos setTodoList with dispatch for updateTodo
     dispatch({type: actions.updateTodo, editedTodo});
   

    try{
      //replaced setIsSaving(true) with startRequest dispatch
      dispatch({ type: actions.startRequest })
       const resp = await fetch(encodeUrl(), options);
       if (!resp.ok){
          throw new Error(resp.status)
         };
    }catch(error){
       console.log(error);
       //replaced setErrorMessage with dispatch and added error message for reverting Todo
       dispatch({type: actions.setLoadError,error: new Error(`${error.message}. Reverting todo...`),});
       //replaced revertedTodo with dispatch for revertedTodo
        dispatch({type: actions.revertTodo,originalTodo});
    }finally{
      //replaced setIsSaving(false) with endReuest dispatch
      dispatch({ type: actions.endRequest })
    };
  }

  //useEffect//
  useEffect(() => {
  const fetchTodos = async () => {
    //I replaced isLoading(true) with dispatch//
    dispatch({ type: actions.fetchTodos });

    const options = {
      method: 'GET',
      headers: { Authorization: token },
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) throw new Error(resp.status);

      const response = await resp.json();
       //replaced setTodooList & map with dispatch
      dispatch({ type: actions.loadTodos, records: response.records });
    } catch (error) {
        //replaced setErrorMessage with dispatch
      dispatch({ type: actions.setLoadError, error });
    }
  };

  fetchTodos();
}, [encodeUrl, token]);
  
    //return  JSX//
    return (
    <div className={styles.appContainer}>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving}/>
      
      <TodoList todoList={todoState.todoList} onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}  isLoading={todoState.isLoading}
      />
      <hr />
      <TodosViewForm  
        sortDirection={sortDirection} setSortDirection={setSortDirection}
        sortField={sortField} setSortField={setSortField} 
        queryString={queryString} setQueryString={setQueryString} 
      />
      {todoState.errorMessage !== "" &&
        <>
         <hr/>
         <p className={styles.errorMessage}>{todoState.errorMessage}</p>
         <button onClick={() => dispatch({ type: actions.clearError })}>Dismiss</button>
        </>
        }
    </div>
  )
}

export default App

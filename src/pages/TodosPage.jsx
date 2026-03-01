import TodoForm from "../features/TodoForm.jsx";
import TodosViewForm from "../features/TodosViewForm.jsx";
import TodoList from "../features/TodoList/TodoList.jsx";
import styles from "../App.module.css";

function TodosPage({
onAddTodo, 
  isSaving,
  todoList, 
  onCompleteTodo, 
  onUpdateTodo, 
  isLoading,
  errorMessage,
  sortDirection, setSortDirection, 
  setQueryString, queryString, 
  sortField, setSortField, 
  actions, dispatch }){
 return (
    <>
      <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />
      <TodoList 
        todoList={todoList} 
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo} 
        isLoading={isLoading} 
      />
      <hr />
      <TodosViewForm  
        sortDirection={sortDirection} setSortDirection={setSortDirection}
        sortField={sortField} setSortField={setSortField} 
        queryString={queryString} setQueryString={setQueryString} 
      />
      {errorMessage !== "" &&
        <>
          <hr/>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <button onClick={() => dispatch({ type: actions.clearError })}>Dismiss</button>
        </>
      }
    </>
  )
}

export default TodosPage
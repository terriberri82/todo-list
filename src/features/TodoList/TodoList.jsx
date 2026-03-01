import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";
import { useSearchParams, useNavigate} from "react-router-dom";
import {useEffect} from 'react';

function TodoList({todoList, onCompleteTodo,onUpdateTodo, isLoading}){
  const filteredTodoList= todoList.filter(todo => !todo.isCompleted);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15; 
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const navigate = useNavigate();


  //Pagination handlers
  const handlePreviousPage = () => {
  const previousPage = Math.max(currentPage - 1, 1);
  setSearchParams({page: previousPage});
};
const handleNextPage = () =>{
const nextPage = Math.min(currentPage + 1, totalPages);
setSearchParams({ page: nextPage });
}

//useEffect
useEffect(() =>{
if (totalPages >0){
  const isPageNumberValid = Number.isFinite(currentPage);
const isPageOutRange = currentPage < 1 || currentPage > totalPages;

  if (!isPageNumberValid || isPageOutRange) {
    navigate('/');
  }
}
}, [currentPage, totalPages, navigate])

console.log({ currentPage, totalPages, filteredLen: filteredTodoList.length });
    return (
      <>
      {isLoading ? (
        <p>Todo list loading...</p>
        ) : filteredTodoList.length === 0? (
         <p>Add todo above to get started</p>) : (
        <>
          <ul className={styles.unorderedListChanges}>
           { currentTodos.map(todo => 
           <TodoListItem key={todo.id} todo={todo} 
            onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>)}
           </ul>
           <div className={styles.paginationControls}>
            <button  onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
           </div>
         </>
         )
      }
      </>
    )
        
}

export default TodoList
function TodoList({todos}){
    return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
    )
}

export default TodoList
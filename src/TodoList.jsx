function TodoList(){
    const todos = [
    {id: 1, title: "Review Week 1"},
    {id: 2, title: "Complete Week 1 Assignment"},
    {id: 3, title: "Submit Assignment"}

  ]
    return (
       <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    );
}

export default TodoList
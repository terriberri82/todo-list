const actions = {  
fetchTodos: 'fetchTodos',
loadTodos: 'loadTodos',
addTodo: 'addTodo', 
startRequest: 'startRequest',
endRequest: 'endRequest',
updateTodo: 'updateTodo',
completeTodo: 'completeTodo',
revertTodo: 'revertTodo',
setLoadError: 'setLoadError',
clearError: 'clearError',
};

const initialState = {
    todoList: [],
    isLoading:false,
    isSaving:false,
    errorMessage:"",

}

function reducer (state = initialState, action){
 switch (action.type){
  case actions.fetchTodos:
    return{
        ...state,
        isLoading: true
    };
  case actions.loadTodos:
    return{
        ...state,
        todoList: action.records.map((record) =>{
          const todo = {
            id: record.id, 
            ...record.fields,
          };
          if (todo.isCompleted === undefined) {
               todo.isCompleted = false;
                } return todo
        }),
        isLoading: false
    };
  case actions.setLoadError:
    return{
        ...state,
        isLoading: false, 
        errorMessage: action.error.message, 
    };
  case actions.addTodo: {
      const savedTodo ={
        id: action.record.id,
        ...action.record.fields, 
        isCompleted: action.record.fields.isCompleted ?? false,
    };
    return{
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
    }; 
 };
  case actions.startRequest:
    return{
        ...state,
        isSaving: true
    };
  case actions.endRequest:
    return{
        ...state,
        isLoading: false,
        isSaving: false,
    };
  case actions.updateTodo: {
    const updatedTodos = state.todoList.map((todo) =>{
      if (todo.id === action.editedTodo.id){
        return {...action.editedTodo};
      }
      return todo
    });
     const updatedState = {
        ...state,
        todoList: updatedTodos,
     };
       if (action.error) {
      updatedState.errorMessage = action.error.message;
  }
    return updatedState;
    
}

  case actions.completeTodo: {
    const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.id) {
          return {...todo, isCompleted:true};
        }
        return todo
     });
    return{
        ...state,
        todoList: updatedTodos
    };
  }
  case actions.revertTodo: {
    const revertedTodos = state.todoList.map((todo) => {
        if (todo.id === action.originalTodo.id) {
        return action.originalTodo;
      }
      return todo
      });
    return{
        ...state,
        todoList: revertedTodos,
    };
}
  case actions.clearError: {
    return{
        ...state,
        errorMessage: ''
    };
 };
 default: 
   return state;
 
};
}





export {initialState, actions, reducer};


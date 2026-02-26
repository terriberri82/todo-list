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

function reducer (state = initialState, action){
 switch (action.type){
  case actions.fetchTodos:
    return{
        ...state,
    };
  case actions.loadTodos:
    return{
        ...state,
    };
  case actions.addTodo:
    return{
        ...state,
    };
  case actions.startRequest:
    return{
        ...state,
    };
  case actions.endRequest:
    return{
        ...state,
    };
  case actions.updateTodoTodo:
    return{
        ...state,
    };
  case actions.completeTodo:
    return{
        ...state,
    };
  case actions.revertTodo:
    return{
        ...state,
    };
  case actions.setLoadError:
    return{
        ...state,
    };
  case actions.clearError:
    return{
        ...state,
    };
 };
 
};

const initialState = {
    todoList: [],
    isLoading:false,
    isSaving:false,
    errorMessage:"",

}



export {initialState, actions};


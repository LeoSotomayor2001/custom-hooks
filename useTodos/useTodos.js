import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


const init=()=>{
    //parse es el opuesto de stringify
    //intenta parsear todo lo que esta en el LS y si  esta vacio agarra el arreglo
    return JSON.parse(localStorage.getItem('todos') )|| [];
}

export const useTodos = () => {

    //init inicializa el reducer
    const [todos, dispatch] = useReducer(todoReducer, [],init);

    useEffect(() => {
      localStorage.setItem('todos',JSON.stringify(todos));
    
      
    }, [todos])
    

    const handleNewTodo=(todo)=>{
        const action={
            type:'[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDeleteTodo=(id)=>{
        dispatch({
            type:'[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo=(id)=>{
        dispatch({
            type:'[TODO] Toggle Todo',
            payload: id
        });
    }

    return{
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todos,
        todosCount:todos.length,
        pendingTodosCount:todos.filter(todo=> !todo.done).length
    }




  
}

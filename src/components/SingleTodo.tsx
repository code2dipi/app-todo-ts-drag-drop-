import React, { useEffect, useRef, useState } from 'react'
import {Todo} from '../model'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import './style.css'
import { Draggable } from 'react-beautiful-dnd';


type Props={
 index:number, 
 todo:Todo,
 key:number,
 todos:Todo[],
 setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
} 


const SingleTodo=({index,todo,todos,setTodos}:Props)=> {

const [edit, setEdit] = useState<boolean>(false)  
const [editTodo, setEditTodo]=useState<string>(todo.todo) // todo.todo intitial state

const handleDone=(id:number)=>{
    setTodos(todos.map((todo)=>

    todo.id===id? {...todo, isDone: !todo.isDone}:todo 
    ))
}
   

const handleDelete=(id:number)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))  // todo.id!==id then only return // (instead of this id(n=1) all of them will be returned(new arrays after filter) and this id will be deleted).

}

const handleEdit=(e:React.FormEvent,id:number)=>{
    e.preventDefault();
    setTodos(
        todos.map((todo)=>todo.id===id?{...todo,todo:editTodo}:todo)                      
    )
    setEdit(false)
}

const  inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
 inputRef.current?.focus();
}, [edit]) // whenever edit changes it will fire of this which means focus on edit text box


    return (
      <Draggable 
      draggableId={todo.id.toString()}
      index={index}>
        {
          (provided,snapshot)=>(
            <form className={`todos_single ${snapshot.isDragging? 'drag':''}`}
            onSubmit={(e)=>handleEdit(e,todo.id)}
            {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
            {
              edit?
              (
                 <input
                  ref={inputRef}
                  value={editTodo} 
                  onChange={(e)=>setEditTodo(e.target.value)} 
                  className="todos_single_text"/>
              ):(
                
                    todo.isDone? (
                        <s className='todos_single_text'>{todo.todo}</s>
                    ):(
                        <span className='todos_single_text'>{todo.todo}</span>
                    )
                
              )
            }
    
           
         
          <span className="icon" onClick={()=>{
                if(!edit && !todo.isDone){
                    setEdit(!edit)
                }
          }
            }>
          <AiFillEdit/>
            </span>     
          <span className="icon" onClick={()=>handleDelete(todo.id)}>
            <AiFillDelete/>
            </span>      
            <span className="icon" onClick={()=>handleDone(todo.id)}>
            <MdDone/>
            </span> 
    
        </form>
          )
        }
     
      </Draggable>
    
  )
}

export default SingleTodo
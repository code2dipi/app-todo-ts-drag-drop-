import React ,{ useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC=()=> {
   const [todo, setTodo] = useState<string>('')
   const [todos, setTodos]=useState<Todo[]>([]) // Array of type interface
   const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

   const handleAddToDo=(e:React.FormEvent)=>{ // when form submitted 
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id:Date.now(), todo, isDone:false}]) // what already inside todos we gonna add another todo // (todo:todo=>todo since both are same name)
      setTodo(""); // empty the todo in input field
    }
    
   }

  const onDragEnd=(result:DropResult)=>{
    console.log(result);
    const {source, destination}=result

    if(!destination) return;
    if(destination.droppableId===source.droppableId && destination.index===source.index) return;

    let add,
    active=todos,
    complete=completedTodos

    //source
    if(source.droppableId==='TodosList'){
      add=active[source.index]             // get index from source active
      active.splice(source.index,1)        // removing element from the given index
    }else{
      add=complete[source.index]            // get index from source active
      complete.splice(source.index,1)
    }
    //  Destination
    if(destination.droppableId==='TodosList'){
    
      active.splice(destination.index,0,add) // add element in avtive Array (droppable id TodoList),o(not removing anything)
    }else{
      complete.splice(destination.index,0,add) // add element in complete Array (index droppable id TodoRemove)

    }
   
    setCompletedTodos(complete)
    setTodos(active)

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
    <span className="heading">Manage your task</span>
    <InputField todo= {todo} setTodo={setTodo} handleAdd={handleAddToDo}/>
    <TodoList 
      todos={todos} 
      setTodos={setTodos}
      completedTodos={completedTodos} 
      setCompletedTodos={setCompletedTodos}/>
    </div>
    </DragDropContext>

  );
}

export default App;

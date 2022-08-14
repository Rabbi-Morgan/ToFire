import React, { useEffect, useState } from "react"
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Todo from "./Todo";
import './Styles/Todo.css'
import { db } from "../firebase";

function Todos() {
  const [todos, setTodos] = useState([])
  const [input,setInput] = useState("");
  const eventInput = (event)=>{
    setInput(event.target.value) 
  }
  const addTodo = event =>{

    // setTodos([...todos, input])  //former way of adding the todo without our database
    db.collection('todos').add({
      todo: input
    })
    event.preventDefault()
    setInput("")
  }
  useEffect(()=>{
    db.collection("todos").onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc=>doc.data().todo))
      setTodos(snapshot.docs.map(doc=>doc.data().todo))
    })
  },[]);
  // useEffect(()=>{
  //   console.log(input)
  // }, [input])
  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <h2>Todos for the great programmer Morgan</h2>
        <FormControl>
          <InputLabel htmlFor="todo">Todo Item</InputLabel>
         <Input onChange={eventInput} value={input} type='text' id="todo"/>
        </FormControl>
        <FormControl>
        <Button disabled={!input} type="submit" variant="contained" color="primary">ADD TODO</Button>
        </FormControl>
        <ul>
          {todos.map((todo,ind)=> <Todo todo={todo} ind ={ind} key={ind}/>)}
        </ul>
        
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
}

export default Todos
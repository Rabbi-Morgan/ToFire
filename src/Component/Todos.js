import React, { useEffect, useState } from "react"
import { Button, FormControl, Input, InputLabel, Select, MenuItem, Grid, Container } from '@material-ui/core'
import Todo from "./Todo";
import './Styles/Todo.css'
import { db } from "../firebase";
import firebase from "firebase/compat/app";

function Todos() {
  const [todos, setTodos] = useState([])
  const [input,setInput] = useState("");
  const [order,setOrder] = useState("desc")
  const eventInput = (event)=>{
    setInput(event.target.value) 
  }
  const changeOrder = event => {
    setOrder(event.target.value)
  }
  const addTodo = event =>{

    // setTodos([...todos, input])  //former way of adding the todo without our database
    db.collection('todos').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: input
    })
    event.preventDefault()
    setInput("")
  }
  useEffect(()=>{
    db.collection("todos").orderBy('timestamp', order).onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc=>doc.data().todo))
      setTodos(snapshot.docs.map(doc=>doc.data().todo))
    })
  },[]);
  // useEffect(()=>{
  //   console.log(input)
  // }, [input])
  return (
    <div className="App">
      <Container>
      <form onSubmit={addTodo}>
        <h2>Todos for the great programmer Morgan</h2>
        <Grid container spacing={3}>
          <Grid itemn xs={6}>
        <FormControl>
          <InputLabel id="label">Order-by</InputLabel>
          <Select onChange={changeOrder} labelId="label" id="select" value="desc">
          <MenuItem value="desc">Descend by date</MenuItem>
          <MenuItem value="acnd">Ascend by date</MenuItem>
</Select>

        </FormControl>
        </Grid>
        <Grid itemn xs={6}>
        <FormControl>
          <InputLabel htmlFor="todo">Todo Item</InputLabel>
         <Input onChange={eventInput} value={input} type='text' id="todo"/>
        </FormControl>
        <FormControl>
        <Button disabled={!input} type="submit" variant="contained" color="primary">ADD TODO</Button>
        </FormControl>
        </Grid>
        </Grid>
        <ul>
          {todos.map((todo,ind)=> <Todo todo={todo} ind ={ind} key={ind}/>)}
        </ul>
        
        {/* <button type="submit">Submit</button> */}
      </form>
      </Container>
    </div>
  );
}

export default Todos
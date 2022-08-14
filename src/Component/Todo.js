import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React from 'react'

function Todo({todo,ind}) {
  return <List>
    <ListItem>
      <ListItemText primary={todo} secondary={`This is todo number ${ind+1}`}></ListItemText>
    </ListItem>
  </List>
}

export default Todo
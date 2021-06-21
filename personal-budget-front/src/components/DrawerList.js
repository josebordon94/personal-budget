import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import HelpIcon from '@material-ui/icons/Help'
import { Redirect } from 'react-router-dom'

const DrawerList = () => {
  const [redirect, setRedirect] = useState(false)
  const logOut = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('jwt')
    localStorage.removeItem('user_id')
    setRedirect(true)
    return
  }

  return (
    <div>
      <List>
        <ListItem button component={Link} to="/home" key="1">
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText>Mi cuenta</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/operations" key="2">
          <ListItemIcon>
            <LocalAtmIcon />
          </ListItemIcon>
          <ListItemText>Operaciones</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button onClick={logOut} key="3">
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/help" key="4">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText>Ayuda</ListItemText>
        </ListItem>
        <Divider />
      </List>
      {redirect ? <Redirect to="/login" /> : null}
    </div>
  )
}

export default DrawerList

import React from 'react'
import { makeStyles } from '@material-ui/core'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'
import Operations from '../pages/Operations'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Help from '../pages/Help'

const estilos = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

const Routing = () => {
  const classes = estilos()
  //Check if JSON Web Token is defined to permit access
  const jwt = localStorage.getItem('jwt')
  return (
    <div className={classes.root}>
      <BrowserRouter>
        {jwt ? null : <Redirect to="/login" />}
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/operations" exact component={Operations} />
        <Route path="/help" exact component={Help} />
      </BrowserRouter>
    </div>
  )
}

export default Routing

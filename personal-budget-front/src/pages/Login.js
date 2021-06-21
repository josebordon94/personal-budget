import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import UILink from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import apirest from '../services/apirest'
import NavbarUnregistered from '../components/NavbarUnregistered'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(11),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: {
    color: 'red',
    fontSize: '9em',
  },
  link: {
    fontSize: '18px',
    textAlign: 'center',
    textDecoration: 'none',
    '& a': {
      textDecoration: 'none',
      fontStyle: 'none',
      color: 'blue',
    },
  },
}))

export default function Login() {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const loginData = {
      email: formData.email,
      password: formData.password,
    }
    axios.post(apirest.apiUrl + '/users/login', loginData).then((res) => {
      if (res.data.error) {
        console.log('Autentication error')
        setErrorMsg(res.data.message)
      } else {
        localStorage.setItem('jwt', res.data.token)
        localStorage.setItem('email', loginData.email)
        localStorage.setItem('user_id', res.data.user_id)
        localStorage.setItem('user_name', res.data.user_name)
        setErrorMsg('')
        setRedirect(true)
      }
    })
  }

  if (redirect) {
    return <Redirect to="/home" />
  }
  return (
    <>
      <NavbarUnregistered />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <Typography color="secondary">{errorMsg}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<ExitToAppIcon />}
            >
              Iniciar sesión
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <UILink component="button" className={classes.link}>
                <Link to="/signUp">¿No tiene un usuario? Regístrese aquí.</Link>
              </UILink>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}

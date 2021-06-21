import React, { useState } from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useForm, Controller } from 'react-hook-form'
import NavbarUnregistered from '../components/NavbarUnregistered'
import { Link, Redirect, useHistory } from 'react-router-dom'
import UILink from '@material-ui/core/Link'
import apirest from '../services/apirest'
import axios from 'axios'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

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
  field: {
    marginTop: '1.2em',
  },
  link: {
    marginTop: '15px',
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

const SignUp = ({ handleClose }) => {
  let history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const classes = useStyles()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    const createUser = () => {
      axios.post(apirest.apiUrl + '/users', data).then((res) => {
        if (res.data.error) {
          console.log('Invalid data')
          setErrorMsg(res.data.message)
        } else {
          setErrorMsg('')
          return history.push('/login') // redirect
        }
      })
    }
    createUser()
  }

  return (
    <>
      <NavbarUnregistered />
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <Typography component="h1" variant="h5">
          Formulario de registro
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Nombre y apellido"
                autoFocus
                onChange={onChange}
                error={!!error}
                helperText={
                  error
                    ? 'Este campo es obligatorio. Cuatro caracteres como mínimo.'
                    : ''
                }
                className={classes.field}
              />
            )}
            rules={{ required: 'Este campo es obligatorio', minLength: 4 }}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? 'Debe ingresar un email válido.' : ''}
                type="email"
                className={classes.field}
              />
            )}
            rules={{
              required: 'Este campo es obligatorio.',
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password"
                variant="outlined"
                value={value}
                onChange={onChange}
                fullWidth
                error={!!error}
                helperText={
                  error ? 'Debe ingresar una contraseña de 4 a 16 dígitos.' : ''
                }
                type="password"
                className={classes.field}
              />
            )}
            rules={{
              required: 'Campo obligatorio',
              minLength: 4,
              maxLength: 16,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.field}
            startIcon={<AssignmentIndIcon />}
          >
            Registrarse
          </Button>
        </form>
        <Typography color="secondary">{errorMsg}</Typography>
        <UILink component="button" className={classes.link}>
          <Link to="/login">¿Ya tiene un usuario? Inicie sesión aquí.</Link>
        </UILink>
      </Container>
    </>
  )
}

export default SignUp

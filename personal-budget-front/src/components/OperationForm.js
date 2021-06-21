import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputIcon from '@material-ui/icons/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import apirest from '../services/apirest'
import CustomizedSnackbars from './CustomizedSnackbar'
import { useForm, Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root: {},
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function OperationForm(props) {
  const classes = useStyles()
  const { handleSubmit, control } = useForm()
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
  const jwt = localStorage.getItem('jwt')

  const user_id = localStorage.getItem('user_id')

  const dateNow = new Date() // Creating a new date object with the current date and time
  const year = dateNow.getFullYear() // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1 // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset
  const date =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate()

  const materialDateInput = `${year}-${month}-${date}`
  const handleChange = (event) => {
    const name = event.target.name
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  const [state, setState] = React.useState({
    operationType: 1,
    mount: 0,
    concept: '',
    date: dateNow.toISOString().split('T')[0],
  })

  const onSubmit = (data) => {
    const operation = {
      user_id: user_id,
      concept: data.concept,
      mount: data.mount,
      type: state.operationType,
      date: state.date,
    }
    const sendData = async () => {
      let config = {
        headers: {
          'x-access-token': jwt,
        },
      }
      await axios.post(apirest.apiUrl + '/operations', operation, config)
      setOpenSuccessSnackbar(true)
      props.reFetch()
    }
    sendData()
  }

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomizedSnackbars
        openSnackbar={openSuccessSnackbar}
        setOpenSnackbar={setOpenSuccessSnackbar}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Controller
            name="mount"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                value={value}
                helperText={
                  error
                    ? 'Ingrese un número válido con dos decimales para los centavos.'
                    : 'Número con centavos opcionales.'
                }
                label="Monto $"
                fullWidth={true}
                onChange={onChange}
              />
            )}
            rules={{
              required: 'Debe ingresar un número, con centavos opcionales.',
              pattern: /^\d*\.?\d{2}$/,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="operationType">Tipo</InputLabel>
            <Select
              native
              value={state.operationType}
              onChange={handleChange}
              inputProps={{
                name: 'operationType',
                id: 'operationType',
              }}
            >
              <option value={1}>Ingreso</option>
              <option value={2}>Egreso</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="concept"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                value={value}
                id="concept"
                label="Concepto"
                fullWidth={true}
                helperText={
                  error
                    ? 'Este campo es obligatorio.'
                    : 'Nombre para describir la operación.'
                }
                onChange={onChange}
              />
            )}
            rules={{
              required: 'Debe ingresar un número, con centavos opcionales.',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="date"
            label="Fecha de operacion"
            type="date"
            name="date"
            defaultValue={materialDateInput}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth={true}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<InputIcon />}
            fullWidth={true}
          >
            Realizar operación
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default OperationForm

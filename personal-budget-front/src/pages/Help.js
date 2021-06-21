import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core/'
import LoggedUserHeader from '../components/LoggedUserHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'justified',
    color: theme.palette.text.secondary,
  },
  userName: {
    fontSize: '1.3rem',
    marginBottom: '0.3rem',
    textAlign: 'left',
    color: 'black',
  },
  fullColumn: {
    height: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: theme.mixins.toolbar,
  helpList: {
    color: 'black',
    '& li': {
      listStyleType: 'square',
    },
  },
}))

const Help = () => {
  const classes = useStyles()
  return (
    <>
      <LoggedUserHeader />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h1" color="initial">
                Sección de ayuda
              </Typography>
              <Typography variant="body1" color="initial">
                "Mi presupuesto" es una aplicación web sencilla dónde podrá
                llevar un seguimiento de sus ingresos y egresos personales de
                dinero. En esta sección se presenta una descripción de las
                tareas que puede realizar en el sistema.
              </Typography>
              <Typography variant="h2" color="initial">
                1. Sección "Mi cuenta"
              </Typography>
              <Typography variant="body1" color="initial">
                En esta sección podrá acceder a un resúmen de su actividad.
                Presenta dos apartados:
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                style={{ marginLeft: '12px' }}
              >
                <b>1) Balance:</b> la cantidad de dinero total que dispone. La
                misma se calcula sumando todos los ingresos y restando todos los
                egresos registrados en su cuenta.
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                style={{ marginLeft: '12px' }}
              >
                <b>2) Últimas operaciones:</b> consiste en una tabla dónde se
                muestran las últimas 10 operaciones registradas en su cuenta.
              </Typography>
              <Typography variant="h2" color="initial">
                2. Sección "Operaciones"
              </Typography>
              <Typography variant="body1" color="initial">
                Desde esta sección podrá registrar nuevas operaciones, tanto
                ingresos como egresos, y revisar todo su historial de
                operaciones anterior. Para lo mismo se dispone de dos apartados:
              </Typography>
              <Typography
                variant="h3"
                color="initial"
                style={{ marginLeft: '12px' }}
              >
                Formulario de nueva operación
              </Typography>
              <Typography variant="body1" color="initial">
                Completando este formulario se procederá a registrar una nueva
                operación en su cuenta. Debe ingresar los campos de:
              </Typography>
              <ul className={classes.helpList}>
                <li>
                  <b>Concepto:</b> descripción de la operación.
                </li>
                <li>
                  <b>Monto:</b> cifra correspondiente al importe de la
                  operación. Debe ser un número positivo, y se permiten dos
                  decimales para expresar los centavos.
                </li>
                <li>
                  <b>Tipo:</b> identifica la operación como Ingreso o Egreso de
                  dinero.
                </li>
                <li>
                  <b>Fecha:</b> por defecto, el formulario presentará la fecha
                  del día de hoy como opción. No obstante, puede cambiarse si
                  desea registrar una operación anterior o futura.
                </li>
              </ul>
              <Typography variant="body1" color="initial">
                Una vez completados los campos, utilice el botón de "Realizar
                operación" para registrar el ingreso o egreso de dinero. El
                mismo ya podrá verse reflejado inmediatamente en el total de su
                balance y en el historial de operaciones.
              </Typography>
              <Typography
                variant="h3"
                color="initial"
                style={{ marginLeft: '12px' }}
              >
                Historial de operaciones
              </Typography>
              <Typography variant="body1" color="initial">
                En este apartado se presenta una tabla con los datos de todas
                las operaciones registradas en su cuenta. Los mismos pueden ser
                editados mediante el botón de lápiz que se visualiza al inicio
                de cada fila de la tabla.
              </Typography>
              <Typography variant="body1" color="initial">
                Al interactuar con el botón de edición, podrá cambiar los datos
                "Concepto" y "Monto" de la operación seleccionada. El tipo de
                operación y la fecha no pueden modificarse. Si desea modificar
                esos campos, deberá eliminar la operación y registrar una
                operación nueva.
              </Typography>
              <Typography variant="body1" color="initial">
                Al entrar en el modo de edición, se habilitarán dos botones al
                comienzo de la fila que sustituyen al lápiz:
              </Typography>
              <ul className={classes.helpList}>
                <li>
                  <b>Confirmar:</b> guarda los cambios que fueron editados en
                  los campos.
                </li>
                <li>
                  <b>Eliminar:</b> elimina la operación definitivamente. Esta
                  acción no puede revertirse.
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Help

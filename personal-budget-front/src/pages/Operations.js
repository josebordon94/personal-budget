import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core/'
import OperationForm from '../components/OperationForm'
import OperationHistory from '../components/OperationHistory'
import LoggedUserHeader from '../components/LoggedUserHeader'
import axios from 'axios'
import apirest from '../services/apirest'
import Progress from '../components/Progress'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperTable: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
  },
  sectionTitle: {
    display: 'flex',
    flexDirection: 'flexRow',
    alignItems: 'center',
    fontSize: '3rem',
    marginBottom: '0.1em',
    color: 'black',
  },
  sectionSubTitle: {
    fontSize: '2rem',
    marginBottom: '0rem',
    textAlign: 'left',
    color: 'black',
  },
  large: {
    width: '5rem',
    height: '5rem',
  },
  fullColumn: {
    height: '100%',
  },
  balanceText: {
    fontSize: '5rem',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  historyTitle: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
}))

const Operations = () => {
  const jwt = localStorage.getItem('jwt')
  const classes = useStyles()
  const [ops, setOps] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const user_id = localStorage.getItem('user_id')
  const reFetch = () => {
    setReload(!reload)
  }
  const getOperations = async () => {
    let config = {
      headers: {
        'x-access-token': jwt,
      },
    }
    const res = await axios.get(
      apirest.apiUrl + '/operations/' + user_id,
      config,
    )
    await new Promise((resolve) =>
      setTimeout(resolve, apirest.simulationRequestDelay),
    )
    setOps(res.data)
    setLoading(false)
  }
  useEffect(async () => {
    setLoading(true)
    getOperations()
    renderTable()
  }, [reload])

  const renderTable = () => {
    if (loading) {
      return <Progress />
    } else {
      return (
        <OperationHistory
          ops={ops}
          loading={loading}
          reFetch={reFetch}
          setLoading={setLoading}
        />
      )
    }
  }
  return (
    <>
      <LoggedUserHeader />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <div className={classes.sectionTitle}>
          <Typography
            variant="h1"
            color="initial"
            className={classes.sectionTitle}
          >
            Operaciones
          </Typography>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="h2"
                color="initial"
                className={classes.sectionSubTitle}
              >
                Realizar una operación
              </Typography>
              <OperationForm reFetch={reFetch} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperTable} style={{ marginTop: '25px' }}>
              <Typography
                variant="h2"
                color="initial"
                className={classes.historyTitle + ' ' + classes.sectionSubTitle}
              >
                Historial
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                style={{ marginLeft: '1.6em' }}
              >
                Puede editar el concepto y el monto de cada operación.
              </Typography>
              {renderTable()}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Operations

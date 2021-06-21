import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core/'
import LastOperations from '../components/LastOperations'
import Balance from '../components/Balance'
import LoggedUserHeader from '../components/LoggedUserHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperTable: {
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
  },
  sectionSubTitle: {
    fontSize: '2rem',
    marginBottom: '0.3rem',
    textAlign: 'left',
    color: 'black',
  },
  lastOperationsTitle: {
    padding: theme.spacing(3),
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
}))

const Home = () => {
  const classes = useStyles()
  return (
    <>
      <LoggedUserHeader />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="h1"
                color="initial"
                className={classes.sectionSubTitle}
              >
                Balance actual de cuenta
              </Typography>
              <Typography color="initial" className={classes.userName}>
                Titular: {localStorage.getItem('user_name')}
              </Typography>
              <Balance />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paperTable} style={{ marginTop: '25px' }}>
              <Typography
                variant="h1"
                color="initial"
                className={
                  classes.sectionSubTitle + ' ' + classes.lastOperationsTitle
                }
              >
                Últimos movimientos
              </Typography>
              <LastOperations />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Home

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    padding: '2rem 2rem 2rem 2rem',
  },
}))

export default function Progress() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress style={{ width: '75px', height: '75px' }} />
    </div>
  )
}

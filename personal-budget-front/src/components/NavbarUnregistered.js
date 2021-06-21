import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core'

import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3px',
  },
  appBar: { marginBottom: '500px' },
}))

const NavbarUnregistered = (props) => {
  const classes = useStyles()
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <AccountBalanceWalletIcon />
        <Typography variant="h6" className={classes.title} color="inherit">
          Mi presupuesto
        </Typography>
        <IconButton
          aria-label="delete"
          color="inherit"
          href="https://github.com/josebordon94"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="inherit"
          href="https://www.linkedin.com/in/josebordon94/"
        >
          <LinkedInIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavbarUnregistered

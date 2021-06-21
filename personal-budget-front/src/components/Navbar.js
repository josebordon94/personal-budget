import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core'

import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '1px',
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
}))

const Navbar = (props) => {
  const classes = useStyles()
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          className={classes.menuButton}
          onClick={() => props.accionAbrir()}
        >
          <MenuIcon />
        </IconButton>
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

export default Navbar

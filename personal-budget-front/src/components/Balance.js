import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import apirest from '../services/apirest'

const useStyles = makeStyles((theme) => ({
  balanceText: {
    fontSize: '4rem',
  },
  expense: {
    color: 'red',
  },
}))

const Balance = () => {
  const classes = useStyles()
  const [mount, setMount] = useState()
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    let config = {
      headers: {
        'x-access-token': jwt,
      },
    }
    const user_id = localStorage.getItem('user_id')
    const getData = async (user) => {
      const res = await axios.get(
        apirest.apiUrl + '/operations/balance/' + user,
        config,
      )
      setMount(res.data)
    }
    getData(user_id)
  }, [])
  if (mount >= 0) {
    return (
      <>
        <Typography
          variant="body1"
          color="primary"
          align="justify"
          className={classes.balanceText}
        >
          $ {mount}
        </Typography>
      </>
    )
  } else {
    return (
      <>
        <Typography
          variant="body1"
          color="primary"
          align="justify"
          className={`${classes.balanceText} ${classes.expense}`}
        >
          $ {mount}
        </Typography>
      </>
    )
  }
}

export default Balance

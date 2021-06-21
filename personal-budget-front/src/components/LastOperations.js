import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useState, useEffect } from 'react'
import axios from 'axios'
import apirest from '../services/apirest'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    fontWeight: 'bold',
    ' & tr td, tr th': {
      fontSize: '1.1em',
    },
  },
  income: {
    color: 'green',
  },
  outcome: {
    color: 'red',
  },
})

function createData(id, concept, mount, type, date) {
  return { id, concept, mount, type, date }
}

export default function LastOperations() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    const user_id = localStorage.getItem('user_id')
    const getData = async function () {
      let newRows = []
      let config = {
        headers: {
          'x-access-token': jwt,
        },
      }
      const res = await axios.get(
        apirest.apiUrl + '/operations/last/' + user_id,
        config,
      )
      res.data.forEach((element) => {
        newRows.push(
          createData(
            element._id,
            element.concept,
            element.mount,
            element.type,
            element.date,
          ),
        )
      })
      setRows(newRows)
    }
    getData()
  }, [])

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        {rows.length > 0 ? (
          <caption></caption>
        ) : (
          <caption>No hay registros para mostrar.</caption>
        )}

        <TableHead>
          <TableRow>
            <TableCell>Concepto</TableCell>
            <TableCell align="right">Importe</TableCell>
            <TableCell align="right">Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.concept}
              </TableCell>
              <TableCell
                align="right"
                className={row.type === 1 ? classes.income : classes.outcome}
              >
                {row.type === 1 ? '+' : '-'}
                {row.mount}
              </TableCell>
              <TableCell align="right">
                {row.date.split('T')[0].replaceAll('-', '/')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
// Icons
import EditIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState, useEffect } from 'react'
import axios from 'axios'
import apirest from '../services/apirest'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
    fontWeight: 'bold',
    ' & tr td, tr th': {
      fontSize: '1.1em',
    },
  },
  selectTableCell: {
    maxWidth: 40,
  },

  input: {
    width: 130,
    height: 40,
  },
}))

const createData = (id, concept, mount, type, date) => ({
  id,
  concept,
  mount,
  type,
  date,
  isEditMode: false,
})

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles()
  const { isEditMode } = row
  let cellText
  if (name === 'mount') {
    if (row.type === 1) {
      cellText = <span style={{ color: 'green' }}>+{row.mount}</span>
    } else {
      cellText = <span style={{ color: 'red' }}>-{row.mount}</span>
    }
  } else {
    cellText = row[name]
  }
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        cellText
      )}
    </TableCell>
  )
}
function OperationHistory(props) {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [previous, setPrevious] = React.useState(rows)
  const jwt = localStorage.getItem('jwt')
  const user_id = localStorage.getItem('user_id')
  let config = {
    headers: {
      'x-access-token': jwt,
    },
  }
  useEffect(() => {
    const fillTable = () => {
      let newRows = []
      props.ops.forEach((element) => {
        const date = new Date(element.date)
          .toISOString()
          .split('T')[0]
          .replaceAll('-', '/')
        newRows.push(
          createData(
            element._id,
            element.concept,
            element.mount,
            element.type,
            date,
          ),
        )
      })
      setRows(newRows)
    }
    const getData = function () {
      fillTable()
    }
    getData()
  }, [props])

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }))
    }
    const value = e.target.value
    const name = e.target.name
    const { id } = row
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
  }

  const handleDelete = (operation_id) => {
    axios
      .delete(
        apirest.apiUrl + '/operations/' + user_id + '/' + operation_id,
        config,
      )
      .then((res) => {
        if (res.data.error) {
          console.log('Invalid data')
          props.reFetch()
          setRows('Loading')
        } else {
          props.reFetch()
          setRows('Loading')
        }
      })
  }

  const handleSave = (operation_id) => {
    let updateData
    rows.map((row) => {
      if (row.id === operation_id) {
        updateData = row
      }
      return 'x'
    })
    updateData.mount = parseFloat(updateData.mount).toFixed(2)
    axios
      .put(
        apirest.apiUrl + '/operations/' + user_id + '/' + operation_id,
        updateData,
        config,
      )
      .then((res) => {
        if (res.data.error) {
          console.log('Invalid data for update!')
          props.reFetch()
        } else {
          props.reFetch()
        }
      })
    onToggleEditMode(operation_id)
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>
          {rows.length > 0
            ? 'Utilice el botón de lápiz para editar o eliminar un registro.'
            : 'No hay registros para mostrar.'}
        </caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Concepto</TableCell>
            <TableCell align="left">Monto</TableCell>
            <TableCell align="left">Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      // onClick={() => onToggleEditMode(row.id)}
                      onClick={() => handleSave(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="edit"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: 'concept', onChange }} />
              <CustomTableCell {...{ row, name: 'mount', onChange }} />
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default OperationHistory

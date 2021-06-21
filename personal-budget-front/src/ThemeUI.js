import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, deepOrange, grey } from '@material-ui/core/colors'
const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[200],
    },
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: deepOrange[800],
    },
    black: {
      main: indigo[800],
    },
  },
  typography: {
    allVariants: {
      color: 'black',
    },
    h1: {
      fontSize: '2rem',
      marginBottom: '0.3rem',
      textAlign: 'left',
      color: 'black',
      marginBottom: '0.2em',
    },
    h2: {
      fontSize: '1.5rem',
      marginBottom: '0.3rem',
      textAlign: 'left',
      color: 'black',
      marginTop: '0.5em',
      marginBottom: '0.2em',
    },
    h3: {
      fontSize: '1.2rem',
      marginBottom: '0.3rem',
      textAlign: 'left',
      color: 'black',
      marginTop: '0.5em',
      marginBottom: '0.2em',
      fontStyle: 'italic',
    },
  },
})
export default theme

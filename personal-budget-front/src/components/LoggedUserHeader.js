import React from 'react'
import { Hidden } from '@material-ui/core'
import Navbar from './Navbar'
import Drawer from './Drawer'

const LoggedUsedHeader = () => {
  const [abrir, setAbrir] = React.useState(false)

  const accionAbrir = () => {
    setAbrir(!abrir)
  }

  return (
    <>
      <Navbar accionAbrir={accionAbrir} />
      <Hidden smDown>
        <Drawer variant="permanent" open={true} />
      </Hidden>
      <Hidden mdUp>
        <Drawer variant="temporary" open={abrir} onClose={accionAbrir} />
      </Hidden>
    </>
  )
}

export default LoggedUsedHeader

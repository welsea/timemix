import React from 'react'
import { withRouter } from 'next/router'

function tr({router}) {
  
  return (
    <div>name: {router.query.name}</div>
  )
}

export default withRouter(tr)
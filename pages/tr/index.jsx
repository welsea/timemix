import React from 'react'
import { withRouter } from 'next/router'

function tr({router}) {
  
  return (
    <div>id:{router.query.id}, name: {router.query.name}</div>
  )
}

export default withRouter(tr)
import React from 'react'
import { withRouter } from 'next/router'

function mine({router}) {
  
  return (
    <div>name: {router.query.name}</div>
  )
}

export default withRouter(mine)
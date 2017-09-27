import React from 'react'

import { Join } from './Join'
import { Pending } from './Pending'
import { InActive } from './InActive'

let Layout = (props) => {

  const {user = {}} = props
  const {isPending, hasTenant, isInActive} = user
  let render = null
  if (!hasTenant)
    render = <Join {...props}/>
  else if (isPending)
    render = <Pending {...props}/>
  else if (isInActive)
    render = <InActive {...props}/>

  return (
    <div className="loginColumns ">
      {render}
    </div>
  )
}

export { Layout }




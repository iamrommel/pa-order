import React from 'react'
import { withUser } from '../../../../containers/withUser'

import { Join } from './Join'
import { Pending } from './Pending'
import { InActive } from './InActive'

let Layout = ({isPending, hasTenant, isInActive}) => {

  let render = null
  if (!hasTenant)
    render = <Join/>
  else if (isPending)
    render = <Pending/>
  else if (isInActive)
    render = <InActive/>

  return (
    <div className="loginColumns ">
      {render}
    </div>
  )
}

Layout = withUser()(Layout)
export { Layout }



import React from 'react'
import { withSignin } from '../containers/withSignin'

let Page = ({children}) => {
  return <div>{children}</div>
}

Page = withSignin()(Page)
export { Page }


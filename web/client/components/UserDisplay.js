import { Image } from 'pcmli.umbrella.web-ui'
import React from 'react'
import _ from 'lodash'

import { withUser } from '../containers/withUser'

let UserDisplay = ({user = {}}) => {
  const userName = _.get(user, 'profile.name')
  const picture = _.get(user, 'profile.picture')

  return (
    <div className="dropdown profile-element">
        <span>
          <Image url={picture} name={userName} className="img-responsive img-lg img-circle"/>
         </span>
      <span className="block m-t-md">
              <h4 className="text-white">{userName}</h4>
      </span>

    </div>

  )

}

UserDisplay = withUser()(UserDisplay)
export { UserDisplay }
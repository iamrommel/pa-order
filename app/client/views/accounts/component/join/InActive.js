import React from 'react'
import { IboxContent, Icon } from 'pcmli.umbrella.web-ui'
import { LogoutButton } from '../../../../components'

let InActive = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-white">
        <h2 className="font-bold">Your account was set as in active</h2>

        <p>
          Your account was set to in-active by your organization administrator Contact them immediately for more information
        </p>

        <p>
          And if you are not interested at all, just log-out.
        </p>


      </div>
      <div className="col-md-6">
        <div>
          <IboxContent>
            <div className="row m-sm">
              <h1 className="text-center m-b-lg">
                <Icon name="ban" className="fa-5x text-warning"/>
              </h1>
              <LogoutButton/>

            </div>
          </IboxContent>
        </div>
      </div>
    </div>
  )
}

export { InActive }



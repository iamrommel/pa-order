import React from 'react'
import { IboxContent, Icon } from 'pcmli.umbrella.web-ui'
import { LogoutButton } from '../../../../components'

let Pending = () => {
  return (
    <div className="row">
      <div className="col-md-6 text-white">
        <h2 className="font-bold">Wait for your administrator to accept your request</h2>

        <p>
          Your request to join the organization is still pending, please wait for your organization administrator to accept it. Contact them immediately for more information
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
                <Icon name="hourglass-start" className="fa-5x text-info"/>
              </h1>

              <LogoutButton/>

            </div>
          </IboxContent>
        </div>
      </div>
    </div>
  )
}

export { Pending }



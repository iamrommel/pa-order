import React from 'react'
import {  IboxContent, Image } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'

import { LoginButton, CopyrightNotice } from '../../components'
import { routesDef } from '../../../startup/client/config/routes'
import { AppVersion } from '../../components/index'
import { withUser } from '../../containers/withUser'

class LoginPage extends React.Component {
  componentDidMount () {
    const {user = {}} = this.props

    const {redirectAuthenticatedUser} = user
    redirectAuthenticatedUser && redirectAuthenticatedUser({redirectPath: routesDef.JoinPage.path})
  }

  render () {
    return (
      <div className="loginColumns animated fadeInDown">
        <div className="row">
          <div className="col-md-6 text-white">
            <div className="row">
              <div className="col-md-4">
                <Image url="/img/logo.png" className="img-lg"/>
              </div>
              <div className="col-md-8">
                <h2 className="font-bold">Pa-Order!</h2>
                <small>A simple restaurant management system!</small>
              </div>
            </div>
            <div className="m-t-lg">
              <h4>Welcome!</h4>
            </div>
            <p>
              You needGoogle account first in order to login to this application. You need to ask permission also of your organization head in order to connect to your records.
            </p>

          </div>
          <div className="col-md-6">
            <IboxContent>
              <LoginButton/>
            </IboxContent>
          </div>
        </div>
        <hr/>
        <div className="row text-white">
          <div className="col-md-6">
            <CopyrightNotice/>
          </div>
          <div className="col-md-6 text-right">
            <AppVersion/>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage = compose(withUser)(LoginPage)
export { LoginPage }




import React from 'react'
import { PageHeader, PageContent, Breadcrumb, IboxContent } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'

import { Layout } from './component/join/Layout'
import { withUser } from '../../containers/withUser'
import { routesDef } from '../../../imports/startup/client/config/routes'

class JoinPage extends React.Component {

  ensureSignIn = () => {
    const {user = {}} = this.props

    if (!user.loading) {
      const {redirectAuthenticatedUser} = user
      redirectAuthenticatedUser && redirectAuthenticatedUser({redirectPath: routesDef.OverviewPage.path})
    }
  }

  componentDidMount () {
    this.ensureSignIn()
  }

  componentWillReceiveProps (nextProps) {
    this.ensureSignIn()
  }

  render () {
    return (
      <PageContent>
        <Layout {...this.props}/>
      </PageContent>
    )
  }
}

JoinPage = compose(withUser)(JoinPage)
export { JoinPage }

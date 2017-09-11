import React from 'react'
import { PageHeader, PageContent, Breadcrumb, IboxContent } from 'pcmli.umbrella.web-ui'
import _ from 'lodash'
import { Layout } from './component/join/Layout'
import { withUser } from '../../containers/withUser'
import { routesDef } from '../../../imports/startup/client/config/routes'

class JoinPage extends React.Component {

  ensureSignIn () {
    const {user = {}, history} = this.props

    const isNotCurrentPage = history.location.pahtname !== routesDef.JoinPage.path

    if (isNotCurrentPage) {
      const {redirectAuthenticatedUser} = user
      redirectAuthenticatedUser && redirectAuthenticatedUser({redirectPath: routesDef.OverviewPage.path})
    }
  }

  componentWillReceiveProps (nextProps) {
    const {user = {}, history = {}} = this.props
    const isNotCurrentPage = _.get(history, 'location.pahtname') !== routesDef.JoinPage.path

    if (!user.loading && isNotCurrentPage)
      this.ensureSignIn()
  }

  render () {
    return (
      <PageContent>
        <Layout/>
      </PageContent>
    )
  }
}

JoinPage = withUser()(JoinPage)
export { JoinPage }

import React from 'react'

class UserInRolePage extends React.Component {
  ensureSignIn = () => {
    const {redirectAuthenticatedUser, router} = this.props
    redirectAuthenticatedUser(router)
  }

  componentWillMount () {
    this.ensureSignIn()
  }

  componentDidMount () {
    this.ensureSignIn()
  }

  render () {
    return <div>This is user in role page.</div>
  }
}

export { UserInRolePage }




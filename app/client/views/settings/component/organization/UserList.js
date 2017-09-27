import React from 'react'
import { Ibox, IboxContent, IboxHeader, IboxTools, Icon, Table, Status, Image } from 'pcmli.umbrella.web-ui'

import { RemoveUserButton } from './RemoveUserButton'
import { ActivateUserButton } from './ActivateUserButton'

const createRow = (m = {}, i, {highlightClassName, onSelect}) => {
  const {_id, status, profile = {}} = m
  const {name, picture} = profile

  return (
    <tr key={_id || i} className={highlightClassName} onClick={() => onSelect(m)}>
      <td>
        <Image url={picture} className="img-sm img-circle "/>
      </td>
      <td>
        <h4>{name} </h4>
      </td>
      <td><Status value={status}/></td>
    </tr>
  )
}

const List = ({users, onSelectUser}) => {

  const onSelect = (item) => {
    onSelectUser(item)
  }
  const head = (
    <thead className="bg-muted">
    <tr>
      <th style={{width: 8}}>&nbsp;</th>
      <th>User</th>
      <th>Status</th>
    </tr>
    </thead>
  )

  return (
    <Table
      dataArray={users}
      createRow={createRow}
      className="table-space-large"
      selectable
      onSelect={onSelect}
      head={head}
    />
  )
}

export class UserList extends React.Component {

  state = {selectedUser: {}}
  onSelectUser = (selectedUser) => {
    this.setState({selectedUser})
  }

  componentDidMount () {
    const {users = []} = this.props
    const selectedUser = users.length > 0 && users[0]
    this.setState({selectedUser})
  }

  render () {
    const {users = [], currentUser} = this.props
    const {selectedUser} = this.state

    return (
      <Ibox>
        <IboxHeader title="Organization users">
          <IboxTools>
            <div className="btn-group">
              <ActivateUserButton currentUser={currentUser} initialValues={{...selectedUser}}/>
              <RemoveUserButton currentUser={currentUser} initialValues={{...selectedUser}}/>
            </div>
          </IboxTools>
        </IboxHeader>
        <IboxContent>
          <List users={users} onSelectUser={this.onSelectUser}/>
        </IboxContent>
      </Ibox>
    )
  }
}
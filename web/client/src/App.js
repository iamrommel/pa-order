import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  state = {users: []}

  componentDidMount () {
    this.getUsers()
  }

  getUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}))
  }

  render () {

    const {users} = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to Pa-Order. A simple restaurant ordering system.</h2>
        </div>

        {
          users.map((user, i) => {
            return <p key={i}>{user.name} with age of {user.age}</p>
          })

        }

      </div>
    )
  }
}

export default App

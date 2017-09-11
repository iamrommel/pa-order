import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  state = {users : []}
  componentDidMount () {
    this.getUsers()
  }

  getUsers = () => {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}))
  }

  render () {

    const {users} =  this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {
          users.map((user, i) => {
            return <p key={i}>{user.name} --> {user.age}</p>
          })

        }

      </div>
    )
  }
}

export default App

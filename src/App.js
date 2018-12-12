import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `instructions.md` file.
*/

function UserListItem (props) {
    return (
      <li className="userListItem">
        {
          `${props.user.username} played ${props.user.numOfGames}
          ${props.user.numOfGames === 1 ? 'game' : 'games'}.`
        }
      </li>
    )
  }

function UserList (props) {
  return (
    <div id="userListDiv">
      <h2 id="userListHeading">User List</h2>
      <ul id="userList">
        {
          props.users.map((user) => <UserListItem user={user} key={user.username} />)
        }
      </ul>
      <div>{props.users.length === 0 ? 'No Users' : ''}</div>
    </div>
  )
}

function UserForm (props) {
  const inputLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    numOfGames: 'Number of Games'
  }
    return (
      <div id="formDiv">
        <h2>Enter a User:</h2>
        <form action='#' onSubmit={props.onUserFormSubmit}>
          <div>
          {
            Object.keys(props.appState.newUser).map((input) => {
              return(
                <div className="userInputDiv" key={input}>
                  <label htmlFor={input}>
                    {inputLabels[input]}
                  </label>
                  <input
                    type="text"
                    name={input}
                    id={input}
                    onChange={props.onNewUserInputChange}
                    value={props.appState.newUser[input]}
                  />
                </div>
              )
            })
          }
          </div>
          <div>
            <button type="submit" onClick={props.onUserFormSubmit}>Add</button>
          </div>
        </form>
      </div>
    )
}

class App extends Component {
  state = {
    users: [],
    newUser: {firstName: '', lastName: '', username: '', numOfGames: 0},
    error: ''
  }

  constructor(props) {
    super(props)
    this.updateNewUserInput = this.updateNewUserInput.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  addUser(event){
    event.preventDefault()
    this.setState((currentState) => {
      let isValid = currentState.newUser.firstName &&
        currentState.newUser.lastName &&
        currentState.newUser.username &&
        !isNaN(currentState.newUser.numOfGames);

      if(isValid){
        let userExists = currentState.users.some((user) => user.username === currentState.newUser.username );

        if(userExists){
          return {
            error: `User with username ${currentState.newUser.username} exists`
          }
        }

        currentState.users.push(currentState.newUser)
        return {
          users: currentState.users,
          newUser: {firstName: '', lastName: '', username: '', numOfGames: 0},
          error: ''
        }
      } else {
        let errorText = 'There was an error...'

        if(!currentState.newUser.firstName){
          errorText = "The user's first name must not be empty"
        }

        if(!currentState.newUser.lastName){
          errorText = "The user's last name must not be empty"
        }

        if(!currentState.newUser.username){
          errorText = "The user's username must not be empty"
        }

        if(isNaN(currentState.newUser.numOfGames)){
          errorText = "The Number of Games must be a number"
        }

        return {
          error: errorText
        }
      }
    });
  }

  updateNewUserInput(event) {
    event.persist()
    this.setState((currentState) => {
      currentState.newUser[event.target.id] = event.target.value;
      let newUser = currentState.newUser;
      return {newUser};
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
          <UserList users={this.state.users} />
          <UserForm onUserFormSubmit={this.addUser} onNewUserInputChange={this.updateNewUserInput} appState={this.state} />
          <div id="errorBanner">{this.state.error}</div>
        </header>
      </div>
    );
  }
}

export default App;

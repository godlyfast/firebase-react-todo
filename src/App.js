import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoService from './todo.service'

class App extends Component {
  state = {
    todos: [],
    newTodo: {
      body: ''
    }
  }
  promises = []
  constructor(props) {
    super(props)
    this.TodoService = new TodoService()
    this.handleTodoInputChange = this.handleTodoInputChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }
  componentDidMount() {
    this.TodoService
    .fetch()
    .then(todos => {
      this.setState({todos})
    })
  }

  todos() {
    return this.state.todos.map(
      todo => (
        <div key={todo.id}>{todo.body}
          <button onClick={() => this.removeTodo(todo)}>DELETE</button>
        </div>
      )
    )
  }
  addTodo() {
    this.TodoService
    .create(this.state.newTodo)
    .then(todo => this.setState(
      { todos: [...this.state.todos, todo] }
    ))
  }
  removeTodo(todo) {
    this.TodoService
    .remove(todo.id)
    .then(todo => this.setState(
      { todos: [...this.state.todos.filter(t => t.id !== todo.id)] }
    ))
  }
  handleTodoInputChange(e) {
    this.setState({newTodo: {...this.state.newTodo, body: e.target.value}})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React FIREBASE TODO APP</h1>
        </header>
        {this.todos()}
        <input type="text" onChange={this.handleTodoInputChange}/>
        <button onClick={this.addTodo}>add</button>
      </div>
    );
  }
}

export default App;

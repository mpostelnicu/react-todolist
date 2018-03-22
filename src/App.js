import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  addTodo() {
    if (this.state.value.trim()) {
      this.props.addTodo(this.state.value);
      this.setState({value: ""});
    }
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
      <span className="addBtn" onClick={() => this.addTodo()}>Add</span>
    </div>);
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func
};

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    return (<li className={this.state.checked
        ? "checked"
        : ""}>
      <span onClick={() => this.handleClick()}>{this.props.text}</span>
      <span className="close" onClick={() => this.props.handleDelete()}>×</span>
    </li>);
  }

  handleClick() {
    this.setState({
      checked: !this.state.checked
    })
  }

}

Todo.propTypes = {
  text: PropTypes.string,
  handleDelete: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
  }

  addTodo(txt) {
    const todoList = this.state.todoList.slice();
    todoList.push(txt);
    this.setState({todoList: todoList});
  }

  handleDelete(indexToRemove) {
    this.setState({
      todoList: this.state.todoList.filter((item, index) => (index !== indexToRemove))
    });
  }

  render() {
    const todos = this.state.todoList.map((txt, index) => <Todo text={txt} key={index} handleDelete={() => this.handleDelete(index)}/>);

    return (<div>
      <ul id="myUL">
        {todos}</ul>
      <AddTodo addTodo={(txt) => this.addTodo(txt)}/>
    </div>);
  }
}

export default App;

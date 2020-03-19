import React, { Component } from "react"
import TodoItem from './TodoItem.js'
import todosData from './todosData.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Form } from 'react-bootstrap';

class TodoList extends Component {

    constructor() {
        super()
        this.state = {
            todos: todosData,
            value: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodo = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return ({
                todos: updatedTodo
            })
        })
    }

    handleDelete(item) {
        this.setState(prevState => {
            prevState.todos.splice(prevState.todos.indexOf(item), 1)
            return ({
                todos: prevState.todos
            })
        })
    }

    handleInput(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.setState(prevState => {
            const newTodo = {
                id: Math.max.apply(Math, prevState.todos.map(todo => todo.id)) + 1,
                text: this.state.value,
                completed: false
            }
            prevState.todos.push(newTodo)
            return ({
                todos: prevState.todos
            })
        })
        event.preventDefault();
    }


    render() {
        const todoItems = this.state.todos.map(item => <TodoItem
            key={item.id}
            item={item}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
        />)


        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        return (
            <div>
                <h1 className="title">todos</h1>
                <div className="todo-list">
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup >
                            <FormControl aria-describedby="new todo"
                                type="text"
                                value={this.state.value}
                                onChange={this.handleInput}
                            />
                            <InputGroup.Prepend>
                                <Button variant="outline-primary" type="submit">New Todo</Button>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Form>

                    <Card.Body>
                        {todoItems}
                    </Card.Body>
                    <div style={{ borderTop: '1px solid #cecece', marginTop: '10px' }}>
                        <p className="text-muted">Last Updated: {dateTime}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList
import React, { Component, useState } from "react"
import TodoItem from './TodoItem.js'
import todosData from './todosData.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Form } from 'react-bootstrap';

function TodoList() {

    const [todos, setTodos] = useState(todosData)
    const [value, setValue] = useState("")

    function handleChange(id) {
        const updatedTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            } 
            return todo
        })
    
        setTodos(updatedTodo)
    }

    function handleDelete(item) {
        function arrayRemove(arr, value) { 
            return (arr.filter(function (ele) { 
                return ele != value; })
            )} 
            
        const deletedTodo = arrayRemove(todos, todos.splice(todos.indexOf(item), 1));

        setTodos(deletedTodo)
    }

    function handleInput(event) {
        setValue(event.target.value);
    }

    function handleSubmit(event) {
        setTodos([
            ...todos,
            {
                id: Math.max.apply(Math, todos.map(todo => todo.id)) + 1,
                text: value,
                completed: false
            }
        ])
        event.preventDefault();
    }


    
        const todoItems = todos.map(item => <TodoItem
            key={item.id}
            item={item}
            handleChange={handleChange}
            handleDelete={handleDelete}
        />)

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        return (
            <div>
                <h1 className="title">todos</h1>
                <div className="todo-list">
                    <Form onSubmit={handleSubmit}>
                        <InputGroup >
                            <FormControl aria-describedby="new todo"
                                type="text"
                                value={value}
                                onChange={handleInput}
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

export default TodoList

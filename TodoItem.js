import React from 'react'
import Card  from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import ToastHeader from 'react-bootstrap/ToastHeader'


function TodoItem(props) {
    return(
        <Toast onClose={() => props.handleDelete(props.item)} className="todo-item" >
            <Toast.Header className="d-flex">
                 <input
                    type="checkbox"
                    name="todoItem"
                    checked={props.item.completed}
                    onChange={() => props.handleChange(props.item.id)}
                    className="mr-2"
                /> 
                <strong 
                    className={props.item.completed ? "mr-auto completedStyle" : "mr-auto"}>{props.item.text}
                </strong>
                <small className="ml-1">Just Now</small>
            </Toast.Header>
        </Toast>
    )
}

export default TodoItem
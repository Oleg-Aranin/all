import React from "react";
import {ITodo} from "../interfaces";

type TodoListProps = {
    todos: ITodo[]
    onToggle(id: number): void
    onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({todos, onToggle, onRemove}) => {
    if (todos.length === 0) {
        return <p className='center'>Пока дел нет</p>
    }

    const removeHandler = (even: React.MouseEvent, id: number) => {
even.preventDefault()

        onRemove(id)
    }

    return (
        <ul>
            {todos.map(todo => {
                const classes = ['todo']
                if (todo.completed) {
                    classes.push('completed')
                }

                return (
                    <li className={classes.join(' ')} key={todo.id}>
                        <label htmlFor="todoInput">
                            <input
                                id={'todoInput'}
                                onChange={() => onToggle(todo.id)}
                                type="checkbox"
                                checked={todo.completed}/>
                            <span>{todo.title}</span>
                            <i
                                onClick={(event) => removeHandler(event, todo.id)}
                                className='material-icons red-text'>delete</i>
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}

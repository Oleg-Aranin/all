import axios from 'axios'
import validate = WebAssembly.validate;

const url = 'http://validate.jsontest.com/?json=%7B%22key%22:%22value%22%7D'

interface Todo {
    size: number,
    empty: boolean,
    object_or_array: object,
    parse_time_nanoseconds: number,
    validate: boolean
}

axios.get(url).then(res => {
    const todo = res.data as Todo

    const {validate, empty, size} = todo

    logTodo(size, empty, validate)
})

const logTodo = (size: number, empty: boolean, validate: boolean) => {
    console.log({size, validate, empty})
}

const x = {
    size: 1,
    parse_time_nanoseconds: 15961,
    object_or_array: 'object',
    validate: true,
    empty: false
}


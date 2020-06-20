import React from 'react'
import ReactDOM from 'react-dom'

const starWarsChars = [
    {name: 'Dart', side: 'dark'},
    {name: 'Luk', side: 'light'},
    {name: 'Palpa', side: 'dark'},
    {name: 'Keno', side: 'light'},
]

const App = ({list}) => {
    return (
        <ul>
            {list.map((char, i) => {
                return (
                    <li key={char.name + i}>
                        <strong>{char.name}</strong>
                        {char.state}
                    </li>
                )
            })}
        </ul>
    )
}

const withFilteredProps = (Comment) => ({list, side}) => {
    const filteredList = list.filter(char => char.side === side)

    return <Comment list={filteredList}/>
}

const FilteredList = withFilteredProps(App)


const hoc = (Component) => {
    return ({list, side}) => {
        const filteredList = list.filter(char => char.side === side)
        return <Component list={filteredList} />
    }
}

// ReactDOM.render(<FilteredList list={starWarsChars} side='light'/>, document.getElementById('id'))

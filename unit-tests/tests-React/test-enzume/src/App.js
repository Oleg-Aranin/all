import React from 'react';
import Character from './Character'


function App({side = 'light'}) {

    const characters = [
        {name: 'Luk', side: 'light'},
        {name: 'Йщда', side: 'light'},
        {name: 'Кеноби', side: 'light'},
        {name: 'Паллетин', side: 'dark'},
        {name: 'Дарт', side: 'dark'},
    ]

    const filteredChars = characters.filter(char => char.side === side)
    return (
        <ul>
            {filteredChars.map((char, index) => (
                <Character key={char.name + index}
                           name={char.name}
                           side={char.side}/>
            ))}
        </ul>
    );
}

export default App;

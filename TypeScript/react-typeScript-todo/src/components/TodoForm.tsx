import React, {useRef} from 'react'

interface TodoFormProps {
    onAdd(title: string): void
}

// export const TodoForm: React.FC<{onAdd(title: string): void}> = (props) => {
export const TodoForm: React.FC<TodoFormProps> = (props) => {
    // const [title, setTitle] = useState<string>('')

    const ref = useRef<HTMLInputElement>(null)

    // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.target.value)
    // }

    const onKeyHandler = (even: React.KeyboardEvent) => {
        if (even.key === 'Enter') {
           props.onAdd(ref.current!.value)
            ref.current!.value = ''
           // setTitle('')
        }
    }

    return (
        <div className='input-field mt2'>
            <input
                ref={ref}
                onKeyPress={onKeyHandler}
              //  onChange={changeHandler}
              //  value={title}
                type="text" id='title'
                placeholder='Введите название дела'/>
            <label htmlFor="title" className='active'>
                Введите название дела
            </label>
        </div>
    );
}

// import React, {useState} from 'react'
//
// export const TodoForm: React.FC = () => {
//     const [title, setTitle] = useState<string>('')
//
//     const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setTitle(event.target.value)
//     }
//
//     const onKeyHandler = (even: React.KeyboardEvent) => {
//         if (even.key === 'Enter') {
//             setTitle('')
//         }
//     }
//
//     return (
//         <div className='input-field mt2'>
//             <input
//                 onKeyPress={onKeyHandler}
//                 onChange={changeHandler}
//                 value={title}
//                 type="text" id='title'
//                 placeholder='Введите название дела'/>
//             <label htmlFor="title" className='active'>
//                 Введите название дела
//             </label>
//         </div>
//     );
// }

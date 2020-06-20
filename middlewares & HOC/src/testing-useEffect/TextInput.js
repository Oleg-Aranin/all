import * as React from 'react';


const TextInput = (props) => {
    const refH = React.useRef(null);
    const ref = props.inputRef ? props.inputRef : refH;



    React.useEffect(() => {
        if (props.focusedByDefault) {
            ref.current.focus();
        }
    }, [props.focusedByDefault, ref]);

    const handleWrapperClick = () => {
        ref.current.focus();
    };

    let timeout;
    const debounce = props.debounce || 200;

    const callback = (e) => {
        const inputValue = e.target.value;
        if (timeout !== undefined) {
            clearInterval(timeout);
        }
        timeout = setTimeout(() => {
            props.onChange(inputValue);
        }, debounce);
    };

    const className = 'bnt-hc-input-wrapper' + (props.className ? ' ' + props.className : '');

    return (
        <div onClick={handleWrapperClick} className={className}>
            <input
                value={props.value}
                className='input'
                ref={ref}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.placeholder} />
            {props.children}
        </div>
    );
};

export default TextInput;



// const TextInput = (props) => {
//     const refH = React.useRef(null);
//     const ref = props.inputRef ? props.inputRef : refH;
//
//     React.useEffect(() => {
//         if (props.focusedByDefault) {
//             ref.current.focus();
//         }
//     }, [props.focusedByDefault, ref]);
//
//     const handleWrapperClick = () => {
//         ref.current.focus();
//     };
//
//     let timeout;
//     const debounce = props.debounce || 200;
//
//     const callback = (e) => {
//         const inputValue = e.target.value;
//         if (timeout !== undefined) {
//             clearInterval(timeout);
//         }
//         timeout = setTimeout(() => {
//             props.onChange(inputValue);
//         }, debounce);
//     };
//
//     const className = 'bnt-hc-input-wrapper' + (props.className ? ' ' + props.className : '');
//
//     return (
//         <div onClick={handleWrapperClick} className={className}>
//             <input className='input' ref={ref} onChange={callback} placeholder={props.placeholder} />
//             {props.children}
//         </div>
//     );
// };
//
// export default TextInput;

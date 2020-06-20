import * as React from 'react';
import './text-input.scss';

interface ITextInputProps {
    value?: string;
    placeholder?: string;
    focusedByDefault?: boolean;
    className?: string;
    onChange?: (value: string) => void;
    children?: JSX.Element;
    inputRef?: React.MutableRefObject<any>;
    debounce?: number;
}

const TextInput: React.FC<ITextInputProps> = (props: ITextInputProps) => {
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

    let timeout: NodeJS.Timeout;
    const debounce = props.debounce || 200;

    const callback = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <input ref={ref} onChange={callback} placeholder={props.placeholder} />
            {props.children}
        </div>
    );
};

export default TextInput;

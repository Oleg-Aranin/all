import * as React from 'react';
import './text-input.scss';

interface ITextInputProps {
    value?: string;
    placeholder?: string;
    focusedByDefault?: boolean;
    className?: string;
    onChange?: (value: string) => void;
    children?: JSX.Element;
}

const TextInput: React.FC = (props: ITextInputProps) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (props.focusedByDefault) {
            ref.current.focus();
        }
    }, [props.focusedByDefault]);

    const handleWrapperClick = () => {
        ref.current.focus();
    };

    const className = 'bnt-hc-input-wrapper' + (props.className ? ' ' + props.className : '');
    return (
        <div onClick={handleWrapperClick} className={className}>
            <input
                ref={ref}
                onChange={e => props.onChange(e.target.value)}
                placeholder={props.placeholder}
                value={props.value}
            />
            {props.children}
        </div>
    );
};

export default TextInput;

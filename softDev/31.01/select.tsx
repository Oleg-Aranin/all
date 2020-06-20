import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import MenuItem from '../menu/menu-item';
import PopoverBorder from '../popover-border/popover-border';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import './select.scss';

interface ISelectProps {
    values: any[];
    value?: any;
    className?: string;
    search?: boolean;
    /**
     * function to extract displayed label
     * applicable only if default renderers are used
     * ignored if corespond renderer function is defined
     */
    labelFn?: (value: any) => string;
    selectedValueRenderer?: (value: any) => React.ReactNode;
    optionValueRenderer?: (value: any, onSelect: (value: any) => void) => React.ReactNode;
    optionsRenderer?: (values: any[], search?: string) => React.ReactNode;
    onChange?: (value: any) => void;
}

// interface ISelectState {
//     opened: boolean;
//     searchValue: string;
// }

const defaultLabelFn = (value: any): string => value;

const defaultSelectedValueRenderer = (labelFn: (value: any) => string) => (value: any): React.ReactNode => {
    return <span className="bnt-hc-select-current-value-label">{labelFn(value)}</span>;
};

const defaultOptionValueRenderer = (labelFn: (value: any) => string) => (
    value: any,
    onSelect: (value: any) => void,
): React.ReactNode => {
    const label = labelFn(value);
    return (
        <MenuItem key={JSON.stringify(value)} hint={label} onClick={() => onSelect(value)}>
            <span>{label}</span>
        </MenuItem>
    );
};

export const Select: React.FC<ISelectProps> = (props: ISelectProps) => {
    const wrapperRef = React.useRef(null);
    const dropdownRef = React.useRef(null);
    const input = React.useRef(null);

    const [state, setState] = React.useState({ opened: false, searchValue: '' });
    //=================================================================================

    //     React.useEffect(() => {
    //         if (props.search) {
    //             if (!prevState.opened && state.opened && input) {
    //                 input.current.focus();
    //             }
    //             if (prevState.opened && !state.opened) {
    //                 setState({ ...state, searchValue: '' });
    //             }
    //     }
    //  }, []);
    //=======================================================
    const wrapper = wrapperRef.current;
    const dropdown = ReactDOM.findDOMNode(dropdownRef.current) as HTMLElement;
    if (wrapper && dropdown) {
        // sync dropdown width to the width of the select itself
        const width = wrapper.offsetWidth;
        dropdown.style.minWidth = `${width}px`;
        dropdown.style.maxWidth = `${width}px`;
        // show scroll bar if dropdown is hidden under the bottom of the screen
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const wrapperBounds = wrapper.getBoundingClientRect();
        const realTop = wrapperBounds.top + wrapperBounds.height + windowTop;
        const padding = 16;
        if (dropdown.offsetHeight + realTop + padding > windowHeight) {
            dropdown.style.maxHeight = `${windowHeight - realTop - padding}px`;
            dropdown.style.overflowY = 'scroll';
        } else {
            dropdown.style.overflowY = 'auto';
        }
    }

    //==================================================================================================
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            setState({
                ...state,
                searchValue: event.target.value,
            });
        }
    };
    //===================================================================================================
    const handleSelect = (value: any): void => {
        // checks that a change has occurred between the prior and recently selected values
        if (props.onChange && props.value !== value) {
            props.onChange(value);
        }
        setState({ ...state, opened: false });
    };

    const className = props.className || '';
    const values = props.values || [];
    const labelFn = props.labelFn || defaultLabelFn;
    const selectedRenderer = props.selectedValueRenderer || defaultSelectedValueRenderer(labelFn);
    const optionRenderer = props.optionValueRenderer || defaultOptionValueRenderer(labelFn);
    const optionsRenderer =
        props.optionsRenderer ||
        ((values: any[], search?: string) => (
            <Menu>
                {values
                    .filter(item => {
                        if (!search) {
                            return true;
                        }
                        return (
                            props
                                .labelFn(item)
                                .toLowerCase()
                                .indexOf(search.toLowerCase()) !== -1
                        );
                    })
                    .map(value => optionRenderer(value, handleSelect))}
            </Menu>
        ));

    return (
        <DropdownComponent
            placement={'bottom-left'}
            visible={state.opened}
            onShow={visible => setState({ ...state, opened: visible })}
            content={<PopoverBorder ref={dropdownRef}>{optionsRenderer(values, state.searchValue)}</PopoverBorder>}
        >
            <div className={`bnt-hc-select-wrapper ${className}`} ref={wrapperRef}>
                {state.opened && props.search ? (
                    <input className={`bnt-hc-select-wrapper-input`} ref={input} onChange={handleTextChange} />
                ) : (
                    <>{selectedRenderer(props.value)}</>
                )}
                <Icon name="caret-down" defaultColor className="bnt-hc-select-dropdown-arrow" />
            </div>
        </DropdownComponent>
    );
};

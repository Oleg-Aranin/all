import React from 'react';
import Icon from '../../icon/icon';
import './visual-control-form-field.scss';
import {Textarea} from '@bentley/bwc-react/core/Textarea';
import {Spinner} from '../../spinner/spinner';

interface IVisualControlFormFieldProps {
    title: string;
    description: string;
    placeholder?: string;
    image: string;
    // imageUrl: string;
    opened: boolean;
    showClearButton: boolean;
    disableClear?: boolean;
    isImageLoading: boolean;

    onClick(): void;

    onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    onClear(): void;
};

export const VisualControlFormField: React.FC<IVisualControlFormFieldProps> = props => {
    const className = 'bnt-hc-inputs-labeled-input' + (props.opened ? ' bnt-hc-opened' : '');
    return (
        <label className={className}>
            <div className="label">
                {props.title}
                <div className="bnt-hc-visual-control-form-field">
                    {props.showClearButton && (
                        <div
                            className="bnt-hc-visual-control-thumbnail"
                            onClick={props.onClick}
                            style={{
                                backgroundImage: `url(${props.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            {!props.image && <img src={props.image} alt='img'/>}
                            {props.isImageLoading && <Spinner size="medium"/>}
                            {!props.disableClear && <Icon name="close" onClick={props.onClear}/>}
                        </div>
                    )}
                    {!props.showClearButton && (
                        <div className="bnt-hc-plus-button" onClick={props.onClick}>
                            <Icon name="add"/>
                        </div>
                    )}
                    <div className="bnt-hc-text-area-wrapper">
                        <Textarea
                            rows={1}
                            placeholder={props.placeholder}
                            defaultValue={props.description}
                            onChange={props.onDescriptionChange}
                        />
                    </div>
                </div>
            </div>
        </label>
    );
};

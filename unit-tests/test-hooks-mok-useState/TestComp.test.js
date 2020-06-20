import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestComponent from "./TestComponent";


Enzyme.configure({adapter: new Adapter()});

describe('<TestComponent />', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
        wrapper = Enzyme.shallow(<TestComponent/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Count Up', () => {
        it('calls setCount with count + 1', () => {
            wrapper.find('#count-up').props().onClick();
            expect(setState()).toHaveBeenCalledWith(1);
        });
    });

    describe('Count Down', () => {
        it('calls setCount with count - 1', () => {
            wrapper.find('#count-down').props().onClick();
            expect(setState).toHaveBeenCalledWith(-1);
        });
    });

    describe('Zero', () => {
        it('calls setCount with 0', () => {
            wrapper.find('#zero-count').props().onClick();
            expect(setState).toHaveBeenCalledWith(0);
        });
    });
});
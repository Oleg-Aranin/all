import React from 'react'
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import TextInput from "./TextInput";

const flushPromises = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}

it('text input change value and has focus by default', () => {
    let value = 'hi'
    const focusedByDefault = true
    const onChange = (v) => {
        value = v
    }

    const wrapped = mount(<TextInput value={value} focusedByDefault onChange={onChange}/>)
    expect(wrapped.find('input').is(':focus')).toBe(true)
    wrapped.find('input').simulate('change', {
        target: {value: 'new comment'}
    })

    wrapped.setProps({value, focusedByDefault, onChange})
    expect(wrapped.find('input').prop('value')).toEqual('new comment')

})

it('set focus by click', () => {
    let value = 'hi'
    const focusedByDefault = true
    const onChange = (v) => {
        value = v
    }

    const wrapped = mount(<TextInput value={value} onChange={onChange}/>)
    expect(wrapped.find('input').is(':focus')).toBe(false)
    wrapped.find('div').simulate('click')
    expect(wrapped.find('input').is(':focus')).toBe(true)

})



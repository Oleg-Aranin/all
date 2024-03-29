import React from "react";
import {mount} from 'enzyme'
import CommentBox from "../CommentBox";
import Root from "../../Root";

let wrapped

beforeEach(() => {
    wrapped = mount(
        <Root>
            <CommentBox/>
        </Root>)
})

afterEach(() => {
    wrapped.unmount()
})

it('has a text area and two buttons', () => {
    expect(wrapped.find('textarea').length).toEqual(1)
    expect(wrapped.find('button').length).toEqual(2)
})

describe('the text area', () => {

    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: {value: 'new comment'}
        })
        wrapped.update()
    })

    it('has a text area that users can type in', () => {
        // 1) находм нужный элемент
        // 2) симулируем событие (назание события как HTML.  React - onChange, HTML - change)
        // 3) предоставляем фейковые данные события "mock" (второй аргумент)
        // 4) обновляем компонент
        // 5) проверяем ожидание prop('value')

        expect(wrapped.find('textarea').prop('value')).toEqual('new comment')
    })

    it('when form is submitted, text area gets emptied', () => {
        wrapped.find('form').simulate('submit')
        wrapped.update()
        expect(wrapped.find('textarea').prop('value')).toEqual('')
    })
})

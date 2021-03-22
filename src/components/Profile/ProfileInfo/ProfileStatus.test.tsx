import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test('status from props shuold be in the state', () => {
        const component = create(<ProfileStatus status="MY STATUS"/>)
        const instanse = component.getInstance()
        expect(instanse.state.status).toBe('MY STATUS')
    })

    test('After creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status="MY STATUS"/>)
        const root = component.root
        const span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test('After creation <input> shouldn\'t be displayed', () => {
        const component = create(<ProfileStatus status="MY STATUS"/>)
        const root = component.root
        expect(() => {
            const input = root.findByType('input')
        }).toThrow()
    })

    test('After creation <span> should contains correct sttrus', () => {
        const component = create(<ProfileStatus status="MY STATUS"/>)
        const root = component.root
        const span = root.findByType('span')
        expect(span.children[0]).toBe('MY STATUS')
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status="MY STATUS"/>)
        const root = component.root
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('MY STATUS')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="MY STATUS" updateStatus={mockCallback}/>)
        const instanse = component.getInstance()
        instanse.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })

})

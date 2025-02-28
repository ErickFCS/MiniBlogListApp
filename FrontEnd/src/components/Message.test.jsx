import { render, screen, } from '@testing-library/react'
import Message from './Message'

test('renders alert message', () => {
    const message = 'Hello'
    render(<Message message={message} />,)
    const element = screen.getByText(message,)
    expect(element,).toBeDefined()
},)

test('renders error message', () => {
    const error = 'This is not good'
    render(<Message error={error} />,)
    const element = screen.getByText(error,)
    screen.debug(element,)
    expect(element,).toBeDefined()
},)

test('renders none', () => {
    const { container, } = render(<Message />,)
    const element = container.querySelectorAll('p',)
    console.log(element,)
    expect(element,).toHaveLength(0,)
},)

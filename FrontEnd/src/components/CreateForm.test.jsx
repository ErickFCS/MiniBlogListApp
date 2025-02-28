import { expect, test, vi, } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, render, } from '@testing-library/react'
import CreateForm from './CreateForm'

test('Correct sended credentials', async () => {
    const mockCreateHandler = vi.fn(() => Promise.resolve(),)
    render(<CreateForm createHandler={mockCreateHandler} />,)
    const user = userEvent.setup()
    const title = screen.getByPlaceholderText('title',)
    const author = screen.getByPlaceholderText('author',)
    const url = screen.getByPlaceholderText('url',)
    await user.type(title, 'test title',)
    await user.type(author, 'test author',)
    await user.type(url, 'test url',)
    const submit = screen.getByText('create',)
    await user.click(submit,)
    expect(mockCreateHandler.mock.calls,).toHaveLength(1,)
    expect(mockCreateHandler.mock.calls[0][0],).toBe('test title',)
    expect(mockCreateHandler.mock.calls[0][1],).toBe('test author',)
    expect(mockCreateHandler.mock.calls[0][2],).toBe('test url',)
},)
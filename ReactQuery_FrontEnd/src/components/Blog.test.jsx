import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const blogExample = {
    title: 'Blog Title',
    author: 'Author Name',
    url: 'https://example.com',
    likes: 10,
    User: {
        id: 'qwertyuiop',
        username: 'username',
        name: 'Name',
    },
}

const userExample = {
    id: 'qwertyuiop',
    username: 'username',
    name: 'Name',
}

test('Details not visibles at first', () => {
    const mockLikesHandler = vi.fn()
    const mockRemoveHandler = vi.fn()

    render(
        <Blog
            blog={blogExample}
            user={userExample}
            likesHandler={mockLikesHandler}
            removeHandler={mockRemoveHandler}
        />
    )

    const title = screen.getByText(blogExample.title)
    expect(title).toBeVisible()
    const author = screen.queryByText(blogExample.author)
    expect(author).toBeVisible()
    const url = screen.queryByText(blogExample.url)
    expect(url).not.toBeVisible()
    const likes = screen.queryByText(`likes ${blogExample.likes}`)
    expect(likes).not.toBeVisible()
    expect(mockLikesHandler.mock.calls).toHaveLength(0)
    expect(mockRemoveHandler.mock.calls).toHaveLength(0)
})

test('Details visibles after click in show', async () => {
    const mockLikesHandler = vi.fn()
    const mockRemoveHandler = vi.fn()

    render(
        <Blog
            blog={blogExample}
            user={userExample}
            likesHandler={mockLikesHandler}
            removeHandler={mockRemoveHandler}
        />
    )

    const user = userEvent.setup()

    const show = await screen.getByText('Show')
    expect(show).toBeVisible()
    await user.click(show)
    const hide = await screen.getByText('Hide')
    expect(hide).toBeVisible()
    const title = screen.getByText(blogExample.title)
    expect(title).toBeVisible()
    const author = screen.queryByText(blogExample.author)
    expect(author).toBeVisible()
    const url = screen.queryByText(blogExample.url)
    expect(url).toBeVisible()
    const likes = screen.queryByText(`likes ${blogExample.likes}`)
    expect(likes).toBeVisible()
    expect(mockLikesHandler.mock.calls).toHaveLength(0)
    expect(mockRemoveHandler.mock.calls).toHaveLength(0)
})

test('Details not visibles after click in hide', async () => {
    const mockLikesHandler = vi.fn()
    const mockRemoveHandler = vi.fn()

    render(
        <Blog
            blog={blogExample}
            user={userExample}
            likesHandler={mockLikesHandler}
            removeHandler={mockRemoveHandler}
        />
    )

    const user = userEvent.setup()

    const show = await screen.getByText('Show')
    expect(show).toBeVisible()
    await user.click(show)
    const hide = await screen.getByText('Hide')
    expect(hide).toBeVisible()
    await user.click(hide)
    const title = screen.getByText(blogExample.title)
    expect(title).toBeVisible()
    const author = screen.queryByText(blogExample.author)
    expect(author).toBeVisible()
    const url = screen.queryByText(blogExample.url)
    expect(url).not.toBeVisible()
    const likes = screen.queryByText(`likes ${blogExample.likes}`)
    expect(likes).not.toBeVisible()
    expect(mockLikesHandler.mock.calls).toHaveLength(0)
    expect(mockRemoveHandler.mock.calls).toHaveLength(0)
})

test('Twice click twice like', async () => {
    const mockLikesHandler = vi.fn()
    const mockRemoveHandler = vi.fn()

    render(
        <Blog
            blog={blogExample}
            user={userExample}
            likesHandler={mockLikesHandler}
            removeHandler={mockRemoveHandler}
        />
    )

    const user = userEvent.setup()

    const show = await screen.getByText('Show')
    expect(show).toBeVisible()
    await user.click(show)
    const likes = screen.queryByText(`likes ${blogExample.likes}`)
    expect(likes).toBeVisible()
    const giveLike = screen.getByText('like')
    expect(giveLike).toBeVisible()
    await user.click(giveLike)
    await user.click(giveLike)
    expect(mockLikesHandler.mock.calls).toHaveLength(2)
    expect(mockRemoveHandler.mock.calls).toHaveLength(0)
})

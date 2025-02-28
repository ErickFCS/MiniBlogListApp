const { test, expect, beforeEach, describe, request } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    const requests = await request.newContext()
    await requests.post('/api/tests/reset')
    await requests.post('/api/users', {
      data: {
        name: "Test User",
        username: "test_user",
        password: 'testUserPassword'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const logInTitle = await page.getByText('Log In')
    const usernameInput = await page.locator('input[name="username"]')
    const passwordInput = await page.locator('input[name="password"]')
    const loginButton = await page.getByRole('button', { name: 'login' })
    await expect(logInTitle).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
      await expect(page.getByText('login successful')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserWrongPassword')
      await loginButton.click()
      await expect(page.getByText('login unsuccessful')).toBeVisible()
      await usernameInput.fill('wrong_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
      await expect(page.getByText('login unsuccessful')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user')
      await passwordInput.fill('testUserPassword')
      await loginButton.click()
    })

    test('a new blog can be created', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      await expect(page.getByText('blog creating succeed')).toBeVisible()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      const container = await page.locator('.card > .card-body').nth(1)
      await expect(container.getByText('Test Title')).toBeVisible()
      await expect(container.getByText('test_user')).toBeVisible()
      await expect(container.getByText('0')).toBeVisible()
      await expect(container.getByText('https://www.testBlogUrl.com')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      const likeButton = await page.getByRole('button', { name: 'Give like' })
      await likeButton.click()
      await expect(page.getByText('Liked')).toBeVisible()
      const container = await page.locator('.card > .card-body').nth(1)
      await expect(container.getByText('1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
      const deleteButton = await page.getByRole('button', { name: 'Delete' })
      await deleteButton.click()
      const container = await page.locator('.card > .card-body').nth(1)
      await expect(container).not.toBeVisible()
    })

    test('a blog can be deleted by the owner', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      const logoutButton = await page.getByRole('button', { name: 'logout' })
      await logoutButton.click()
      const requests = await request.newContext()
      await requests.post('/api/users', {
        data: {
          name: "Test User 2",
          username: "test_user2",
          password: 'testUserPassword2'
        }
      })
      const usernameInput = await page.locator('input[name="username"]')
      const passwordInput = await page.locator('input[name="password"]')
      const loginButton = await page.getByRole('button', { name: 'login' })
      await usernameInput.fill('test_user2')
      await passwordInput.fill('testUserPassword2')
      await loginButton.click()
      const showButton = await page.getByRole('button', { name: 'Show' })
      await showButton.click()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('the blog with more likes is at the top', async ({ page }) => {
      const createBlogButton = await page.getByRole('button', { name: 'create new blog' })
      const titleInput = await page.getByPlaceholder('title')
      const authorInput = await page.getByPlaceholder('author')
      const urlInput = await page.getByPlaceholder('url')
      const createButton = await page.getByRole('button', { name: 'create' })
      await createBlogButton.click()
      await titleInput.fill('Test Title1')
      await authorInput.fill('This doesn\'t matter')
      await urlInput.fill('https://www.testBlogUrl.com')
      await createButton.click()
      await page.waitForTimeout(7000)
      await titleInput.fill('Test Title2')
      await authorInput.fill('This doesn\'t matter2')
      await urlInput.fill('https://www.testBlogUrl2.com')
      await createButton.click()
      await page.waitForTimeout(7000)
      const showButtons = await page.getByRole('button', { name: 'Show' }).all()
      for (let i = showButtons.length; i > 0; i--) {
        const element = showButtons[i - 1];
        await element.click()
      }
      const likeButtons = await page.getByRole('button', { name: 'Give Like' })
      
      await likeButtons.nth(1).click()
      await page.waitForTimeout(1000)
      
      await expect(likeButtons.nth(0).locator('../../../../../../..').getByText('Test Title2')).toBeVisible()
      expect(await likeButtons.nth(0).locator('../../../../../../..').getByText('1')).toBeVisible()
      await expect(likeButtons.nth(1).locator('../../../../../../..').getByText('Test Title1')).toBeVisible()
      expect(await likeButtons.nth(1).locator('../../../../../../..').getByText('0')).toBeVisible()

      await likeButtons.nth(1).click()
      await page.waitForTimeout(1000)
      await likeButtons.nth(1).click()
      await page.waitForTimeout(1000)

      await expect(likeButtons.nth(0).locator('../../../../../../..').getByText('Test Title1')).toBeVisible()
      expect(await likeButtons.nth(0).locator('../../../../../../..').getByText('2')).toBeVisible()
      await expect(likeButtons.nth(1).locator('../../../../../../..').getByText('Test Title2')).toBeVisible()
      expect(await likeButtons.nth(1).locator('../../../../../../..').getByText('1')).toBeVisible()

      await likeButtons.nth(1).click()
      await page.waitForTimeout(1000)
      await likeButtons.nth(1).click()
      await page.waitForTimeout(1000)

      await expect(likeButtons.nth(0).locator('../../../../../../..').getByText('Test Title2')).toBeVisible()
      expect(await likeButtons.nth(0).locator('../../../../../../..').getByText('3')).toBeVisible()
      await expect(likeButtons.nth(1).locator('../../../../../../..').getByText('Test Title1')).toBeVisible()
      expect(await likeButtons.nth(1).locator('../../../../../../..').getByText('2')).toBeVisible()
    })

  })

})
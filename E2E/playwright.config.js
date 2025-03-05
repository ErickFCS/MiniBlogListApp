require('dotenv').config({ path: '../.env' })
const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: 0,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'null',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.NODE_ENV === 'dev' ? 'http://localhost:5173' : `http://localhost:${process.env.PORT}`,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'off',

        /* Run in headless mode */
        // headless: false,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chromium'
                // executablePath: "C:/Users/USER/AppData/Local/ms-playwright/chromium/chrome-win/"
            }
        }

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: process.env.NODE_ENV === 'dev' ? 'cd .. && pnpm run test' : 'cd .. && npm run test',
        url: `http://localhost:${process.env.PORT}`
        // reuseExistingServer: !process.env.CI,
    }
})


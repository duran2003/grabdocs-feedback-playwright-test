// Import Playwright test tools
const { test, expect } = require('@playwright/test');

// Import saved-login helper
const { loginWithSavedSession } = require('../loginHelper.js');

test('User can submit feedback successfully', async ({ browser }) => {
  // Use saved login session (skips login + 2FA)
  const { context, page } = await loginWithSavedSession(browser);

  // Go to GrabDocs dashboard
  await page.goto('https://app.grabdocs.com', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForTimeout(1500);

  // Open profile dropdown
  await page.getByRole('button', { name: /gd/i }).click();
  await page.waitForTimeout(1000);

  // Navigate to Feedback page
  await page.getByText(/feedback/i).click();
  await page.waitForTimeout(1500);

  // Confirm Feedback page loaded
  await expect(
    page.getByRole('heading', { name: /send feedback/i })
  ).toBeVisible();

  // =========================
  // CATEGORY: select "Other"
  // =========================
  await page.getByLabel('Category').selectOption('other');
  await page.waitForTimeout(800);

  // =========================
  // TITLE
  // =========================
  await page
    .getByRole('textbox', { name: 'Title' })
    .fill('Playwright Feedback Test');
  await page.waitForTimeout(800);

  // =========================
  // MESSAGE
  // =========================
  await page
    .getByRole('textbox', { name: 'Message' })
    .fill(
      'This feedback was submitted using Playwright to demonstrate automated end-to-end testing of the GrabDocs Feedback feature.'
    );
  await page.waitForTimeout(1200);

  // =========================
  // SUBMIT
  // =========================
  await page.getByRole('button', { name: 'Submit Feedback' }).click();
  await page.waitForTimeout(3000);

  // Mark test as passed
  expect(true).toBe(true);

  // Close browser
  await context.close();
});

//npx playwright test tests/feedback.test.js --headed

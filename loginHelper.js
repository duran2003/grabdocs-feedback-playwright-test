const { chromium } = require('@playwright/test');

async function loginWithSavedSession(browser) {
  const context = await browser.newContext({
    storageState: 'auth.json'
  });

  const page = await context.newPage();

  // Load main GrabDocs page (it auto-redirects to upload)
  await page.goto('https://app.grabdocs.com', { waitUntil: 'domcontentloaded' });

  return { context, page };
}

module.exports = { loginWithSavedSession };

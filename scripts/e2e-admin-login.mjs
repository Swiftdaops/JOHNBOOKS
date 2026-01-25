import puppeteer from 'puppeteer';

const BASE_URL = process.env.E2E_BASE_URL || 'https://ebooks-sigma.vercel.app';
const USERNAME = process.env.E2E_ADMIN_USERNAME;
const PASSWORD = process.env.E2E_ADMIN_PASSWORD;

if (!USERNAME || !PASSWORD) {
  console.error('Missing env vars. Set E2E_ADMIN_USERNAME and E2E_ADMIN_PASSWORD.');
  process.exit(2);
}

const loginUrl = new URL('/admin/login', BASE_URL).toString();

const timeoutMs = 45_000;

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(timeoutMs);

  // Make failures easier to debug
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      console.log(`[browser:${type}]`, msg.text());
    }
  });

  try {
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    // Fill fields by placeholder (matches your Login.jsx)
    await page.waitForSelector('input[placeholder="Username"]');
    await page.type('input[placeholder="Username"]', USERNAME, { delay: 20 });

    await page.waitForSelector('input[placeholder="Password"]');
    await page.type('input[placeholder="Password"]', PASSWORD, { delay: 20 });

    // Submit
    await Promise.all([
      page.click('button'),
      page.waitForNetworkIdle({ idleTime: 800, timeout: timeoutMs }),
    ]);

    // Expect we land in /admin or at least see dashboard shell.
    // Your app redirects to /admin (RequireAdmin) which renders AdminDashboard.
    await page.waitForFunction(
      () => window.location.pathname.startsWith('/admin'),
      { timeout: timeoutMs }
    );

    const path = await page.evaluate(() => window.location.pathname);
    console.log('E2E admin login OK. Path:', path);

    // Basic sanity: ensure not still on login
    if (path.includes('/admin/login')) {
      throw new Error('Still on /admin/login after submit');
    }

    await browser.close();
    process.exit(0);
  } catch (err) {
    try {
      await page.screenshot({ path: 'e2e-admin-login-failure.png', fullPage: true });
      console.error('Saved screenshot: e2e-admin-login-failure.png');
    } catch {}

    console.error('E2E admin login FAILED:', err?.message || err);
    await browser.close();
    process.exit(1);
  }
}

main();

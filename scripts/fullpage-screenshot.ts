import { chromium } from 'playwright';

const screenshotPath = process.argv[2] || './fullpage-screenshot.png';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations to settle

    // Capture full page
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Full page screenshot saved to: ${screenshotPath}`);

    await browser.close();
})();

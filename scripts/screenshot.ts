import { chromium } from 'playwright';

const screenshotPath = process.argv[2] || './screenshot.png';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Wait for animations to settle

    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    await browser.close();
})();

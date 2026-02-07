
import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1440, height: 1080 });

    console.log('Navigating to localhost:4321...');
    try {
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    } catch (e) {
        console.error('Navigation failed:', e);
        process.exit(1);
    }

    // Scroll to architecture
    const archSection = page.locator('#architecture');
    await archSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Allow scrolling/mermaid render to settle

    console.log('Capturing Architecture Scrollytelling...');
    await archSection.screenshot({
        path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/architecture-scrolly.png'
    });

    await browser.close();
})();

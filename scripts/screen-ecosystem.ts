
import { chromium } from 'playwright';
import path from 'path';

async function capture() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1400, height: 1200 },
        deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    console.log('Navigating to localhost:4321...');
    try {
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

        // Scroll to Ecosystem section
        const section = page.locator('text=Complete Ecosystem').first();
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Wait for animations

        console.log('Capturing Ecosystem Masonry...');
        // Capture the section + some context
        await page.screenshot({
            path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/ecosystem-masonry.png',
            clip: { x: 0, y: 3400, width: 1400, height: 1000 }, // Approximate Y position
            fullPage: false
        });

    } catch (error) {
        console.error('Error capturing screenshot:', error);
    } finally {
        await browser.close();
    }
}

capture();

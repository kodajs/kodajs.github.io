import { chromium } from 'playwright';
import path from 'path';

async function capture() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport to iPhone SE size
    await page.setViewportSize({ width: 375, height: 667 });

    try {
        console.log('Navigating to home (Mobile View)...');
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

        console.log('Opening Mobile Menu...');
        // Click header hamburger
        await page.click('button[aria-label="Open Menu"]');

        // Wait for menu animation
        await page.waitForTimeout(1000);

        // Screenshot Open Menu
        const outputPath = path.resolve('/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/mobile-menu-open.png');
        await page.screenshot({ path: outputPath });
        console.log(`Screenshot saved to ${outputPath}`);

        // Verify links exist
        const docsLink = await page.$('text=Docs');
        if (docsLink) console.log('Docs link found in mobile menu.');

    } catch (error) {
        console.error('Error capturing mobile menu:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

capture();

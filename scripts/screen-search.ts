import { chromium } from 'playwright';
import path from 'path';

async function capture() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    try {
        console.log('Navigating to home...');
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

        console.log('Opening Search (Cmd+K)...');
        // Simulate Cmd+K
        await page.keyboard.press('Meta+k');

        // Wait for modal
        await page.waitForSelector('#command-menu-panel:not(.opacity-0)', { state: 'visible', timeout: 5000 });
        console.log('Search modal opened.');

        // Type query
        console.log('Typing "intro"...');
        await page.locator('#command-search-input').pressSequentially('intro', { delay: 100 });

        // Wait for results
        await page.waitForTimeout(1000);

        // Screenshot
        const outputPath = path.resolve('/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/search-modal.png');
        await page.screenshot({ path: outputPath });
        console.log(`Screenshot saved to ${outputPath}`);

    } catch (error) {
        console.error('Error capturing search:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

capture();


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

    // Find the Cosmic Velocity text and scroll to it
    const cosmicText = page.getByText('Cosmic Velocity');
    await cosmicText.scrollIntoViewIfNeeded();

    // Wait for animations (terminal fills up)
    await page.waitForTimeout(2000);

    // Capture the section (it's the one containing "Cosmic Velocity")
    // We can select by the section tag if we are careful, or just a large viewport shot centered there
    // Since we replaced the content inside the section with specific classes, let's target the grid
    const dashboard = page.locator('.grid.lg\\:grid-cols-2.gap-12').first();

    console.log('Capturing Cosmic Data...');
    // Capture the parent section for context
    const section = dashboard.locator('xpath=../..');

    await section.screenshot({
        path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/cosmic-data.png'
    });

    await browser.close();
})();

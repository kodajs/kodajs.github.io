
import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1440, height: 1200 });

    console.log('Navigating to localhost:4321...');
    try {
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    } catch (e) {
        console.error('Navigation failed:', e);
        process.exit(1);
    }

    // Wait for animations
    await page.waitForTimeout(2000);

    // 1. Capture Features Section (Glass Cards)
    console.log('Capturing Features...');
    const features = await page.$('#features');
    if (features) {
        await features.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({
            path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/radius-features.png',
            clip: { x: 0, y: 1200, width: 1440, height: 800 } // Estimate pos
        });
    }

    // 2. Capture DSL Section (Code Container)
    console.log('Capturing DSLs...');
    // Scroll further down
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);

    await page.screenshot({
        path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/radius-dsl.png',
        clip: { x: 0, y: 2200, width: 1440, height: 800 } // Estimate pos
    });

    // 3. Capture Architecture Matrix (Radius Check)
    console.log('Capturing Architecture...');
    const architecture = await page.$('#architecture');
    if (architecture) {
        await architecture.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({
            path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/radius-architecture.png',
            clip: { x: 0, y: 0, width: 1440, height: 800 } // Will be relative to scroll position if not clipped to viewport
        });
        // Better to just screenshot the element or viewport
        await page.screenshot({
            path: '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/radius-architecture-full.png',
            fullPage: false
        });
    }

    await browser.close();
})();

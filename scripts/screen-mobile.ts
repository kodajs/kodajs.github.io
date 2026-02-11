
import { chromium } from 'playwright';
import path from 'path';

async function captureMobile() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 }, // iPhone X dimensions
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true
    });
    const page = await context.newPage();

    console.log('Navigating to localhost:4321 (Mobile)...');
    try {
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000); // Wait for initial animations

        const artifactsDir = '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6';

        // 1. Hero Section
        console.log('Capturing Mobile Hero...');
        await page.screenshot({
            path: path.join(artifactsDir, 'mobile-hero.png'),
            clip: { x: 0, y: 0, width: 375, height: 812 }
        });

        // 2. Features Bento
        console.log('Capturing Mobile Bento...');
        const features = page.locator('#features');
        await features.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({
            path: path.join(artifactsDir, 'mobile-features.png'),
            clip: { x: 0, y: await features.boundingBox().then(b => b?.y || 0), width: 375, height: 1200 }
        });

        // 3. Architecture
        console.log('Capturing Mobile Architecture...');
        const arch = page.locator('#architecture');
        await arch.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({
            path: path.join(artifactsDir, 'mobile-architecture.png')
        });

        // 4. Cosmic Data
        console.log('Capturing Mobile Cosmic...');
        const cosmic = page.locator('text=Cosmic Velocity').first();
        await cosmic.scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000); // Wait for gauge/terminal
        // Capture a taller area to catch the stacked layout
        await page.screenshot({
            path: path.join(artifactsDir, 'mobile-cosmic.png')
        });

        // 5. Ecosystem
        console.log('Capturing Mobile Ecosystem...');
        const ecosystem = page.locator('text=Complete Ecosystem').first();
        await ecosystem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({
            path: path.join(artifactsDir, 'mobile-ecosystem.png')
        });

    } catch (error) {
        console.error('Error capturing mobile screenshots:', error);
    } finally {
        await browser.close();
    }
}

captureMobile();

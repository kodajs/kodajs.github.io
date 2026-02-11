import { chromium } from 'playwright';
import path from 'path';

async function capture() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Set viewport
    await page.setViewportSize({ width: 1280, height: 1000 });

    try {
        console.log('Navigating to home...');
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

        // Scroll to playground
        const playground = await page.$('text=server.koda');
        if (playground) {
            await playground.scrollIntoViewIfNeeded();
            console.log('Scrolled to Playground.');
        } else {
            console.error('Playground not found!');
            process.exit(1);
        }

        // Click Run
        console.log('Clicking Run (.koda)...');
        await page.click('#run-btn');

        // Wait for output
        await page.waitForTimeout(2000);

        // Screenshot Koda Output
        const outputPathKoda = path.resolve('/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/playground-koda.png');
        await page.screenshot({ path: outputPathKoda });
        console.log(`Screenshot saved to ${outputPathKoda}`);

        // Switch Tab
        console.log('Switching to .zen...');
        await page.click('#tab-zen');
        await page.waitForTimeout(500);

        // Click Run again
        console.log('Clicking Run (.zen)...');
        await page.click('#run-btn');

        // Wait for output
        await page.waitForTimeout(2000);

        // Screenshot Zen Output
        const outputPathZen = path.resolve('/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6/playground-zen.png');
        await page.screenshot({ path: outputPathZen });
        console.log(`Screenshot saved to ${outputPathZen}`);

    } catch (error) {
        console.error('Error capturing playground:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

capture();

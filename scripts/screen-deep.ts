import { chromium } from 'playwright';
import path from 'path';

async function captureDeepPages() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();
    const artifactsDir = '/home/dev/.gemini/antigravity/brain/05bbff83-b5b6-42b7-866f-09d61e918fe6';

    try {
        // 1. Docs Introduction
        console.log('Capturing Docs Introduction...');
        await page.goto('http://localhost:4321/docs/introduction', { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(artifactsDir, 'docs-intro.png'), fullPage: true });

        // 2. Blog Index
        console.log('Capturing Blog Index...');
        await page.goto('http://localhost:4321/blog', { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(artifactsDir, 'blog-index.png'), fullPage: true });

        // 3. Blog Post
        console.log('Capturing Blog Post...');
        await page.goto('http://localhost:4321/blog/announcing-koda-zenith', { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(artifactsDir, 'blog-post.png'), fullPage: true });

    } catch (error) {
        console.error('Error capturing deep pages:', error);
    } finally {
        await browser.close();
    }
}

captureDeepPages();

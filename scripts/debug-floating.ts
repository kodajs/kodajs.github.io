
import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to localhost:4321...');
    try {
        await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    } catch (e) {
        console.error('Failed to navigate:', e);
        process.exit(1);
    }

    // Wait a bit for JS to run
    await page.waitForTimeout(3000);

    const count = await page.evaluate(() => {
        return document.querySelectorAll('.floating-syntax').length;
    });

    console.log(`Found ${count} .floating-syntax elements.`);

    if (count > 0) {
        const styles = await page.evaluate(() => {
            const el = document.querySelector('.floating-syntax');
            if (!el) return null;
            const computed = window.getComputedStyle(el);
            return {
                position: computed.position,
                zIndex: computed.zIndex,
                opacity: computed.opacity,
                display: computed.display,
                visibility: computed.visibility,
                top: computed.top,
                left: computed.left,
                color: computed.color
            };
        });
        if (styles) console.log('Computed styles of first element:', styles);
    }

    await browser.close();
})();

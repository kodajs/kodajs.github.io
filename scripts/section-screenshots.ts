import { chromium } from 'playwright';

const outputDir = process.argv[2] || './screenshots';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    console.log(`📸 Capturing section screenshots to: ${outputDir}`);

    // Get all sections
    const sections = await page.$$('section');
    
    for (let i = 0; i < sections.length; i++) {
        try {
            const section = sections[i];
            
            // Scroll to section
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            
            // Get section info
            const sectionInfo = await section.evaluate((el, index) => {
                const heading = el.querySelector('h1, h2, h3');
                const headingText = heading?.textContent?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || `section-${index}`;
                return { 
                    name: headingText.substring(0, 50),
                    hasContent: el.children.length > 0 
                };
            }, i);
            
            if (sectionInfo.hasContent) {
                // Take screenshot
                await section.screenshot({ 
                    path: `${outputDir}/${i + 1}-${sectionInfo.name}.png`,
                    animations: 'disabled'
                });
                
                console.log(`✅ ${i + 1}-${sectionInfo.name}.png`);
            }
        } catch (error) {
            console.log(`❌ Section ${i + 1} - error: ${error.message}`);
        }
    }

    await browser.close();
    console.log('\n🎉 All section screenshots captured!');
})();

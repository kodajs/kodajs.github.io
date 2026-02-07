import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

/**
 * Mermaid Syntax Validator for KodaJS
 * This script extracts diagrams from index.astro and validates them using the Mermaid CLI.
 */

const ASTRO_PATH = path.join(process.cwd(), 'src/pages/index.astro');
const TEMP_MMD = path.join(process.cwd(), 'temp_diagram.mmd');

try {
    console.log('🔍 Extracting Mermaid diagram from index.astro...');
    const content = readFileSync(ASTRO_PATH, 'utf-8');

    // Regex to find content inside <div class="mermaid"> or <pre class="mermaid">
    // Supports newlines between tag name and class attribute
    const mermaidMatch = content.match(/<(div|pre)\s+class="mermaid[^>]*>([\s\S]*?)<\/\1>/);

    if (!mermaidMatch || !mermaidMatch[2]) {
        console.error('❌ No Mermaid diagram found in index.astro');
        process.exit(1);
    }

    const diagramText = mermaidMatch[2].trim();
    writeFileSync(TEMP_MMD, diagramText);

    console.log('🧪 Validating syntax with @mermaid-js/mermaid-cli...');

    // We use npx to run mmdc without local installation
    // --input specifies the source file
    // --output is required but we'll delete it immediately
    const outputPng = path.join(process.cwd(), 'temp_output.png');

    try {
        execSync(`npx -y @mermaid-js/mermaid-cli -i ${TEMP_MMD} -o ${outputPng}`, { stdio: 'pipe' });
        console.log('✅ Mermaid syntax is VALID!');
    } catch (error: any) {
        console.error('❌ Mermaid syntax error detected:');
        console.error(error.stderr?.toString() || error.message);
        process.exit(1);
    } finally {
        // Cleanup
        [TEMP_MMD, outputPng].forEach(file => {
            try { if (readFileSync(file)) unlinkSync(file); } catch (e) { }
        });
    }

} catch (err: any) {
    console.error('💥 Execution failed:', err.message);
    process.exit(1);
}

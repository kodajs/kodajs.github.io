import { readFileSync, readdirSync, writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const CONTENT_DIR = "src/content";
const TEMP_FILE = "temp_diagram.mmd";

function getAllMdxFiles(dir: string): string[] {
    let files: string[] = [];
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files = [...files, ...getAllMdxFiles(fullPath)];
        } else if (entry.name.endsWith(".mdx")) {
            files.push(fullPath);
        }
    }
    return files;
}

console.log("🚀 Zenith Mermaid Validator Initialized...");

const files = getAllMdxFiles(CONTENT_DIR);
let errorCount = 0;

for (const file of files) {
    const content = readFileSync(file, "utf8");
    const architectureMatch = content.match(/<ZenithArchitecture[^>]*>([\s\S]*?)<\/ZenithArchitecture>/g);

    if (architectureMatch) {
        console.log(`\n📄 Checking file: ${file}`);

        for (const [index, match] of architectureMatch.entries()) {
            // Extract the actual mermaid code from inside the tag
            let diagram = match.replace(/<ZenithArchitecture[^>]*>|<\/ZenithArchitecture>/g, "").trim();

            if (!diagram) continue;

            // MDX Fix: Unescape common entities before validation
            diagram = diagram
                .replace(/&#123;/g, "{")
                .replace(/&#125;/g, "}")
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">");

            // Save to temp file for mmdc to check
            writeFileSync(TEMP_FILE, diagram);
            const TEMP_SVG = `temp_${index}.svg`;

            try {
                // Use mmdc to validate by attempting a render
                execSync(`npx mmdc -i ${TEMP_FILE} -o ${TEMP_SVG} --quiet`, { stdio: "pipe" });
                console.log(`  ✅ Diagram ${index + 1}: Valid`);
            } catch (error: any) {
                console.error(`  ❌ Diagram ${index + 1}: Syntax Error`);
                console.log("----- DIAGRAM START -----");
                console.log(diagram);
                console.log("----- DIAGRAM END -------");
                errorCount++;
            } finally {
                [TEMP_FILE, TEMP_SVG].forEach(f => {
                    if (readdirSync(".").includes(f)) unlinkSync(f);
                });
            }
        }
    }
}

if (errorCount > 0) {
    console.log(`\n❌ Validation Complete: ${errorCount} error(s) found.`);
    process.exit(1);
} else {
    console.log("\n✨ All Zenith Mermaid diagrams are syntactically correct.");
    process.exit(0);
}

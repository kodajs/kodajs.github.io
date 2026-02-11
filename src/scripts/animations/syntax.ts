const codeSnippets = [
    "const koda = new Zenith();",
    "await koda.deploy({ region: 'us-east' });",
    "import { Router } from '@koda/core';",
    "fn main() -> Result<(), Error>",
    "defp deps do",
    "SELECT * FROM cosmic_events",
    "git push origin main",
    "npm install @koda/zenith",
    "console.log('Hello Void');",
    "struct Vector3 { x: f32, y: f32, z: f32 }",
    ".unwrap()",
    "extends MonoBehaviour",
];

function createFloatingSyntax() {
    const el = document.createElement("div");
    el.className = "floating-syntax";
    el.innerText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = 15 + Math.random() * 10 + "s";
    el.style.fontSize = 0.6 + Math.random() * 0.4 + "rem";
    el.style.opacity = (Math.random() * 0.5).toString();

    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 25000);
}

export function initFloatingSyntax() {
    setInterval(createFloatingSyntax, 2000);
    for (let i = 0; i < 5; i++) createFloatingSyntax();
}

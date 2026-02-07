
export function initAnimations() {
    // Text Cycler Animation (Temporal Blur)
    let currentIdx = 0;
    const h1 = document.getElementById("headline-1");
    const h2 = document.getElementById("headline-2");

    if (h1 && h2) {
        const s1 = document.getElementById("subtitle-1");
        const s2 = document.getElementById("subtitle-2");

        // Initialize states
        let headlineIdx = 0;
        let subtitleIdx = 0;

        h1.classList.add("temporal-blur-in");
        h2.style.opacity = "0";
        if (s1) s1.classList.add("temporal-blur-in");
        if (s2) s2.style.opacity = "0";

        // Headline cycler - 5 second interval
        setInterval(() => {
            if (headlineIdx === 0) {
                h1.classList.remove("temporal-blur-in");
                h1.classList.add("temporal-blur-out");
                setTimeout(() => {
                    h2.classList.remove("temporal-blur-out");
                    h2.classList.add("temporal-blur-in");
                }, 200);
                headlineIdx = 1;
            } else {
                h2.classList.remove("temporal-blur-in");
                h2.classList.add("temporal-blur-out");
                setTimeout(() => {
                    h1.classList.remove("temporal-blur-out");
                    h1.classList.add("temporal-blur-in");
                }, 200);
                headlineIdx = 0;
            }
        }, 5000);

        // Subtitle cycler - 7 second interval (offset timing for dynamic feel)
        if (s1 && s2) {
            setTimeout(() => {
                setInterval(() => {
                    if (subtitleIdx === 0) {
                        s1.classList.remove("temporal-blur-in");
                        s1.classList.add("temporal-blur-out");
                        setTimeout(() => {
                            s2.classList.remove("temporal-blur-out");
                            s2.classList.add("temporal-blur-in");
                        }, 200);
                        subtitleIdx = 1;
                    } else {
                        s2.classList.remove("temporal-blur-in");
                        s2.classList.add("temporal-blur-out");
                        setTimeout(() => {
                            s1.classList.remove("temporal-blur-out");
                            s1.classList.add("temporal-blur-in");
                        }, 200);
                        subtitleIdx = 0;
                    }
                }, 7000);
            }, 2500); // Start offset - subtitle changes 2.5s after headline
        }
    }

    // Built With Tech Cyclers - Vertical Slide Animation
    function createTechCycler(prefix: string, count: number, interval: number, startDelay = 0) {
        const elements: HTMLElement[] = [];
        for (let i = 1; i <= count; i++) {
            const el = document.getElementById(`${prefix}-${i}`);
            if (el) elements.push(el);
        }

        if (elements.length < 2) return;

        let currentIdx = 0;

        setTimeout(() => {
            setInterval(() => {
                // Slide out current (upward)
                elements[currentIdx].classList.remove(
                    "tech-slide-active",
                );
                elements[currentIdx].classList.add("tech-slide-exit");

                // Move to next index
                const prevIdx = currentIdx;
                currentIdx = (currentIdx + 1) % elements.length;

                // Slide in next (from below)
                setTimeout(() => {
                    elements[prevIdx].classList.remove(
                        "tech-slide-exit",
                    );
                    elements[currentIdx].classList.add(
                        "tech-slide-active",
                    );
                }, 200);
            }, interval);
        }, startDelay);
    }

    // Initialize Built With cyclers with staggered timing
    createTechCycler("core", 3, 2000, 0); // Rust → Zig → Elixir
    createTechCycler("runtime", 3, 2500, 600); // Bun → Hono → Deno
    createTechCycler("module", 2, 3000, 1200); // ESM → WASM
    createTechCycler("framework", 6, 1800, 1800); // React → Svelte → Solid → Vue → Preact → Qwik

    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll("section, .glass-card").forEach((el) => {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
    });

    // Hyper-Active Data: Live Counters & Bar Animation
    const counters = document.querySelectorAll(".counter");
    const progressBars = document.querySelectorAll("[data-width]");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;

                    // Animate Counter
                    if (target.classList.contains("counter")) {
                        const targetVal = target.getAttribute("data-target");
                        if (!targetVal) return;

                        const endValue = parseInt(targetVal);
                        let startValue = 0;
                        const duration = 2000;
                        const startTime = performance.now();

                        function update(currentTime: number) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(
                                elapsed / duration,
                                1,
                            );
                            const easeOut =
                                1 - Math.pow(1 - progress, 3); // Cubic ease-out

                            target.innerText = Math.floor(
                                startValue +
                                (endValue - startValue) * easeOut,
                            ).toLocaleString();

                            if (progress < 1) {
                                requestAnimationFrame(update);
                            } else {
                                target.innerText =
                                    endValue.toLocaleString();
                            }
                        }
                        requestAnimationFrame(update);
                        counterObserver.unobserve(target);
                    }

                    // Animate Bar
                    if (target.hasAttribute("data-width")) {
                        setTimeout(() => {
                            target.style.width =
                                target.getAttribute("data-width") || "0%";
                        }, 200);
                        counterObserver.unobserve(target);
                    }
                }
            });
        },
        { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
    progressBars.forEach((bar) => counterObserver.observe(bar));

    // Hyper-Active Data: Floating Syntax Background
    // Removed syntaxContainer as it was unused in original code
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
        el.innerText =
            codeSnippets[
            Math.floor(Math.random() * codeSnippets.length)
            ];
        el.style.left = Math.random() * 100 + "%";
        el.style.animationDuration = 15 + Math.random() * 10 + "s";
        el.style.fontSize = 0.6 + Math.random() * 0.4 + "rem";
        el.style.opacity = (Math.random() * 0.5).toString();

        document.body.appendChild(el);

        // Clean up
        setTimeout(() => {
            el.remove();
        }, 25000);
    }

    // Create new syntax particle every 2 seconds
    setInterval(createFloatingSyntax, 2000);
    // Initial batch
    for (let i = 0; i < 5; i++) createFloatingSyntax();

    // Mouse Glow Effect
    const cards = document.querySelectorAll(".glass-card");
    document.addEventListener("mousemove", (e) => {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
            (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // Code Block Toggles
    const btnKoda = document.getElementById("toggle-koda");
    const btnZen = document.getElementById("toggle-zen");
    const codeKoda = document.getElementById("code-koda");
    const codeZen = document.getElementById("code-zen");

    btnKoda?.addEventListener("click", () => {
        if (btnKoda)
            btnKoda.className =
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all bg-sky-500 text-white shadow-lg";
        if (btnZen)
            btnZen.className =
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all text-slate-400 hover:text-white";
        if (codeKoda) {
            codeKoda.style.opacity = "1";
            codeKoda.style.pointerEvents = "auto";
        }
        if (codeZen) {
            codeZen.style.opacity = "0";
            codeZen.style.pointerEvents = "none";
        }
    });

    btnZen?.addEventListener("click", () => {
        if (btnZen)
            btnZen.className =
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all bg-indigo-500 text-white shadow-lg";
        if (btnKoda)
            btnKoda.className =
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all text-slate-400 hover:text-white";
        if (codeKoda) {
            codeKoda.style.opacity = "0";
            codeKoda.style.pointerEvents = "none";
        }
        if (codeZen) {
            codeZen.style.opacity = "1";
            codeZen.style.pointerEvents = "auto";
        }
    });
}

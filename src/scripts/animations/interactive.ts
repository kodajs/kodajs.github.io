export function initInteractiveEffects() {
    // Mouse Glow
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

    // Code Toggles
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

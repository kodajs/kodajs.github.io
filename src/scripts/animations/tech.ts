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
            elements[currentIdx].classList.remove("tech-slide-active");
            elements[currentIdx].classList.add("tech-slide-exit");

            const prevIdx = currentIdx;
            currentIdx = (currentIdx + 1) % elements.length;

            setTimeout(() => {
                elements[prevIdx].classList.remove("tech-slide-exit");
                elements[currentIdx].classList.add("tech-slide-active");
            }, 200);
        }, interval);
    }, startDelay);
}

export function initTechAnimations() {
    createTechCycler("core", 3, 2000, 0);
    createTechCycler("runtime", 3, 2500, 600);
    createTechCycler("module", 2, 3000, 1200);
    createTechCycler("framework", 6, 1800, 1800);
}

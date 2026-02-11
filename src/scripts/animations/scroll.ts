export function initScrollReveal() {
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

    document.querySelectorAll("section, .glass-card, .reveal-on-scroll").forEach((el) => {
        if (!el.classList.contains("reveal-on-scroll")) {
            el.classList.add("reveal-on-scroll");
        }
        observer.observe(el);
    });

    // Counters & Bars
    const counters = document.querySelectorAll(".counter");
    const progressBars = document.querySelectorAll("[data-width]");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;

                    if (target.classList.contains("counter")) {
                        const targetVal = target.getAttribute("data-target");
                        if (!targetVal) return;

                        const endValue = parseInt(targetVal);
                        let startValue = 0;
                        const duration = 2000;
                        const startTime = performance.now();

                        function update(currentTime: number) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeOut = 1 - Math.pow(1 - progress, 3);

                            target.innerText = Math.floor(
                                startValue + (endValue - startValue) * easeOut,
                            ).toLocaleString();

                            if (progress < 1) {
                                requestAnimationFrame(update);
                            } else {
                                target.innerText = endValue.toLocaleString();
                            }
                        }
                        requestAnimationFrame(update);
                        counterObserver.unobserve(target);
                    }

                    if (target.hasAttribute("data-width")) {
                        setTimeout(() => {
                            target.style.width = target.getAttribute("data-width") || "0%";
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
}

export function initHeroAnimations() {
    const h1 = document.getElementById("headline-1");
    const h2 = document.getElementById("headline-2");

    if (h1 && h2) {
        const s1 = document.getElementById("subtitle-1");
        const s2 = document.getElementById("subtitle-2");

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

        // Subtitle cycler - 7 second interval
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
            }, 2500);
        }
    }
}

import { initHeroAnimations } from './animations/hero';
import { initTechAnimations } from './animations/tech';
import { initScrollReveal } from './animations/scroll';
import { initFloatingSyntax } from './animations/syntax';
import { initInteractiveEffects } from './animations/interactive';

export function initAnimations() {
    initHeroAnimations();
    initTechAnimations();
    initScrollReveal();
    initFloatingSyntax();
    initInteractiveEffects();
}

import { useEffect } from "react";

/**
 * Elements that fade/slide in when they enter the viewport.
 * Kept in one list so page components do not need extra markup.
 */
const REVEAL_SELECTOR = [
  ".section-heading",
  ".copy-block",
  ".dark-panel",
  ".info-card",
  ".stat-card",
  ".process-item",
  ".team-card",
  ".contact-card",
  ".notice",
  ".empty-news",
  ".timeline-card",
  ".feature-card",
  ".application-card",
  ".roadmap-card",
  ".technology-step",
  ".technology-stats",
  ".technology__visual",
  ".solution__content",
  ".solution__product",
  ".cta__box",
  ".section-cta__box",
  "[data-reveal]",
].join(",");

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

/**
 * Progressive enhancement: content is fully visible without JS. The hook only
 * marks elements (via a data attribute React does not manage) and reveals them
 * with an IntersectionObserver. Users with "reduce motion" get no animation.
 */
export const useScrollReveal = (rootSelector: string, deps: readonly unknown[]) => {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      // Skip elements that were already revealed and elements nested in another revealed block.
      (element) => !element.dataset.revealState && !element.parentElement?.closest(REVEAL_SELECTOR),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => {
      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((child) => child.matches(REVEAL_SELECTOR))
        : [];
      const step = Math.min(Math.max(siblings.indexOf(element), 0), MAX_STAGGER_STEPS);
      element.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
      element.dataset.revealState = "hidden";
      observer.observe(element);
    });

    // Safety net: never leave content hidden if the observer misbehaves.
    const fallback = window.setTimeout(() => {
      elements.forEach((element) => {
        if (element.dataset.revealState === "hidden" && element.getBoundingClientRect().top < window.innerHeight) {
          element.dataset.revealState = "visible";
        }
      });
    }, 1500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      // Un-mark elements that never became visible so a re-run can pick them up again.
      elements.forEach((element) => {
        if (element.dataset.revealState === "hidden") delete element.dataset.revealState;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

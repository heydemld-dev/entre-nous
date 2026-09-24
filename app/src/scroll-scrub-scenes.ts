import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#B89558",
  background: "#0B0A0A",
  ink: "#ECE6DD",
  muted: "#B9B0A5",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "Не рассказывай. Пусть спрашивают.",
    clip: "/assets/world/scene-01.mp4",
    id: "slow-burn",
    kicker: "ENTRE NOUS",
    label: "SLOW BURN",
    linger: 0.04,
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    mobileObjectPosition: "50% 50%",
    objectPosition: "50% 50%",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 0.42,
    tags: ["Eau de parfum", "30 мл"],
    title: "SLOW BURN",
  },
];

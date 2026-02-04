document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const eyebrow = hero.querySelector(".hero-eyebrow");
  const title = hero.querySelector(".hero-title");
  const subtitle = hero.querySelector(".hero-subtitle"); // optional / legacy
  const circle = hero.querySelector(".hero-circle-text");
  const actions = hero.querySelector(".hero-actions");

  // Safety check — required elements only
  if (!eyebrow || !title || !actions) {
    return;
  }

  // Reset states (important for reloads / live server)
  eyebrow.classList.remove("is-visible");
  title.classList.remove("is-visible");
  if (subtitle) subtitle.classList.remove("is-visible");
  if (circle) circle.classList.remove("is-visible");
  actions.classList.remove("is-visible");

  // Force reflow so transitions always trigger
  void hero.offsetHeight;

  // Staggered animation sequence (ms)
  setTimeout(() => {
    eyebrow.classList.add("is-visible");
  }, 300);

  setTimeout(() => {
    title.classList.add("is-visible");
  }, 650);

  setTimeout(() => {
    actions.classList.add("is-visible");
  }, 950);

  // Circle ALWAYS comes last
  if (circle) {
    setTimeout(() => {
      circle.classList.add("is-visible");
    }, 1350);
  }
});
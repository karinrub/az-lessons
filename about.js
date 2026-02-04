document.addEventListener("DOMContentLoaded", () => {
  const story = document.querySelector(".about-story");
  if (!story) return;

  const cards = story.querySelectorAll(".story-card");
  const indicator = story.querySelector(".story-indicator");
  const btnUp = story.querySelector(".story-btn.up");
  const btnDown = story.querySelector(".story-btn.down");
  const progress = story.querySelector(".story-progress");

  let currentIndex = 0;
  const total = cards.length;

  function updateStory() {
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    progress.textContent = `${currentIndex + 1} / ${total}`;

    const railHeight =
      story.querySelector(".story-rail").offsetHeight - 10;

    const step = railHeight / (total - 1);
    indicator.style.transform =
      `translate(-50%, ${currentIndex * step}px)`;

    btnUp.disabled = currentIndex === 0;
    btnDown.disabled = currentIndex === total - 1;
  }

  btnUp.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateStory();
    }
  });

  btnDown.addEventListener("click", () => {
    if (currentIndex < total - 1) {
      currentIndex++;
      updateStory();
    }
  });

  updateStory();
});
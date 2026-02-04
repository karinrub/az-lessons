document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV APPEAR AFTER SCROLL
     ========================= */

  const nav = document.querySelector(".nav");
  let navShown = false;

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80 && !navShown) {
        nav.classList.add("nav-visible");
        navShown = true;
      }

      if (window.scrollY <= 80 && navShown) {
        nav.classList.remove("nav-visible");
        navShown = false;
      }
    });
  }

  /* =========================
     MOBILE NAV TOGGLE
     ========================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinksContainer.classList.toggle("nav-open");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinksContainer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("nav-open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     NAVIGATION SMOOTH SCROLL
     ========================= */

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  if (nav && navLinks.length > 0) {
    let navHeight = nav.offsetHeight;

    window.addEventListener("resize", () => {
      navHeight = nav.offsetHeight;
    });

    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (!target) return;

        const scrollTarget =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight -
          20;

        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth"
        });
      });
    });
  }

  /* =========================
     PRICING TOGGLE
     ========================= */

  const pricingToggleButtons = document.querySelectorAll(".pricing-toggle button");
  const pricingPanels = document.querySelectorAll(".pricing-panel");

  pricingToggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      pricingToggleButtons.forEach(b => b.classList.remove("active"));
      pricingPanels.forEach(panel => panel.classList.remove("active"));

      button.classList.add("active");

      const targetPanel = document.getElementById(button.dataset.target);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  /* =========================
     GROUP PRICING UPDATE
     ========================= */

  const groupButtons = document.querySelectorAll(".group-btn");
  const groupPriceValue = document.querySelector(".group-price-display span");
  const groupPriceLabel = document.querySelector(".group-price-display small");

  groupButtons.forEach(button => {
    button.addEventListener("click", () => {
      groupButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      if (groupPriceValue) groupPriceValue.textContent = button.dataset.price;
      if (groupPriceLabel) groupPriceLabel.textContent = button.dataset.label;
    });
  });

  /* =========================
     CONTACT BOOKING FLOW
     ========================= */

  const instrumentCards = document.querySelectorAll(".booking-card");
  const lessonCards = document.querySelectorAll(".lesson-card");

  const lessonOptions = document.getElementById("lesson-options");
  const peopleGroup = document.getElementById("people-group");

  const instrumentInput = document.getElementById("instrument-input");
  const lessonInput = document.getElementById("lesson-input");

  instrumentCards.forEach(card => {
    card.addEventListener("click", () => {
      instrumentCards.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });

      card.classList.add("active");
      card.setAttribute("aria-pressed", "true");

      if (instrumentInput) {
        instrumentInput.value = card.dataset.instrument;
      }

      if (lessonOptions) lessonOptions.style.display = "block";

      lessonCards.forEach(l => {
        l.classList.remove("active");
        l.setAttribute("aria-pressed", "false");
      });

      if (lessonInput) lessonInput.value = "";
      if (peopleGroup) peopleGroup.style.display = "none";
    });
  });

  lessonCards.forEach(card => {
    card.addEventListener("click", () => {
      lessonCards.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });

      card.classList.add("active");
      card.setAttribute("aria-pressed", "true");

      if (lessonInput) {
        lessonInput.value = card.dataset.lesson;
      }

      if (peopleGroup) {
        peopleGroup.style.display =
          card.dataset.lesson === "Group Lesson" ? "block" : "none";
      }
    });
  });

  /* =========================
     FORMSPREE SUBMIT + THANK YOU
     ========================= */

  const form = document.getElementById("contact-form");
  const successMessage = document.querySelector(".contact-success");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.style.display = "none";
          if (successMessage) successMessage.hidden = false;
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Network error. Please try again.");
      }
    });
  }

});
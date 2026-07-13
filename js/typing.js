/* =========================================================
   typing.js — hero role typing effect
   ========================================================= */
(function () {
  const roles = [
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Engineer",
    "Generative AI Engineer"
  ];

  const el = document.getElementById("typingText");
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Respect reduced motion: show first role statically
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    el.textContent = roles[0];
  } else {
    tick();
  }
})();

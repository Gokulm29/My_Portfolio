/* =========================================================
   script.js — navigation, scroll interactions, reveals,
   counters, skill bars, contact form
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 350);
  });
  // Fallback in case 'load' already fired or is slow
  setTimeout(() => loader && loader.classList.add("hide"), 2500);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state + progress bar ---------- */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle("scrolled", scrollY > 40);
    backToTop.classList.toggle("visible", scrollY > 600);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll-spy active nav link ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated skill bars ---------- */
  const bars = document.querySelectorAll(".bar-fill");
  const barObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = (el.dataset.level || 0) + "%";
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => barObserver.observe(b));

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  function setError(id, message) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(id + "Error");
    const row = input.closest(".form-row");
    if (message) {
      row.classList.add("invalid");
      errorEl.textContent = message;
    } else {
      row.classList.remove("invalid");
      errorEl.textContent = "";
    }
  }

  function validateField(id) {
    const value = document.getElementById(id).value.trim();
    if (id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) { setError(id, "Email is required."); return false; }
      if (!emailPattern.test(value)) { setError(id, "Enter a valid email address."); return false; }
      setError(id, "");
      return true;
    }
    if (!value) {
      const labels = { name: "Name", subject: "Subject", message: "Message" };
      setError(id, `${labels[id] || "This field"} is required.`);
      return false;
    }
    setError(id, "");
    return true;
  }

  if (form) {
    ["name", "email", "subject", "message"].forEach((id) => {
      const input = document.getElementById(id);
      input.addEventListener("blur", () => validateField(id));
      input.addEventListener("input", () => {
        if (input.closest(".form-row").classList.contains("invalid")) validateField(id);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = ["name", "email", "subject", "message"];
      const results = fields.map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        formSuccess.textContent = "";
        return;
      }

      // No backend configured — build a mailto fallback so the message still reaches Gokul.
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailSubject = encodeURIComponent(subject);
      window.location.href = `mailto:gokulmani200429@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      formSuccess.textContent = "Opening your email client to send this message…";
      form.reset();
    });
  }
});

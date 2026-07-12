/* =========================================================
   animation.js — hero multi-agent network canvas
   Signature element: nodes + pulsing edges, echoing the
   12-agent orchestration project.
   ========================================================= */
(function () {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, dpr;
  let nodes = [];
  const NODE_COUNT = 26;
  const MAX_DIST = 170;

  const colorGold = "212,161,93";
  const colorViolet = "108,124,224";

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1.4,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // update
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.02;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          const color = (i + j) % 2 === 0 ? colorGold : colorViolet;
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const n of nodes) {
      const glow = 0.5 + Math.sin(n.pulse) * 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + glow * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colorGold},${0.5 + glow * 0.4})`;
      ctx.fill();
    }

    if (!prefersReduced) {
      requestAnimationFrame(step);
    }
  }

  function init() {
    resize();
    makeNodes();
    if (prefersReduced) {
      step(); // draw a single static frame
    } else {
      step();
    }
  }

  window.addEventListener("resize", () => {
    resize();
    makeNodes();
  });

  init();
})();

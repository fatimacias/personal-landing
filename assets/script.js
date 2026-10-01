// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// Typing effect for the hero code panel (profile.json)
const codeBody = document.querySelector(".code-panel-body");
if (codeBody) {
  const sourceWrapper = document.createElement("div");
  sourceWrapper.innerHTML = codeBody.innerHTML;
  const totalChars = sourceWrapper.textContent.length;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Walks the original markup and rebuilds it up to `remaining` characters,
  // preserving the syntax-highlighting spans so the typed-out text stays colored.
  function cloneTyped(node, remaining) {
    if (remaining <= 0) return { clone: null, remaining: 0 };
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text.length <= remaining) {
        return { clone: document.createTextNode(text), remaining: remaining - text.length };
      }
      return { clone: document.createTextNode(text.slice(0, remaining)), remaining: 0 };
    }
    const clone = node.cloneNode(false);
    let rem = remaining;
    node.childNodes.forEach((child) => {
      if (rem <= 0) return;
      const result = cloneTyped(child, rem);
      if (result.clone) clone.appendChild(result.clone);
      rem = result.remaining;
    });
    return { clone, remaining: rem };
  }

  function renderTyped(count, showCursor) {
    codeBody.innerHTML = "";
    const result = cloneTyped(sourceWrapper, count);
    if (result.clone) {
      Array.from(result.clone.childNodes).forEach((child) => codeBody.appendChild(child));
    }
    if (showCursor) {
      const cursor = document.createElement("span");
      cursor.className = "code-cursor";
      codeBody.appendChild(cursor);
    }
  }

  if (prefersReducedMotion || totalChars === 0) {
    renderTyped(totalChars, false);
  } else {
    let typed = 0;
    const tick = () => {
      typed += 1;
      renderTyped(typed, true);
      if (typed < totalChars) {
        setTimeout(tick, 14 + Math.random() * 18);
      }
    };
    renderTyped(0, true);
    setTimeout(tick, 500);
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a:not(.lang-switch a)").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Theme toggle (dark/light)
const themeToggle = document.getElementById("themeToggle");
const statusTheme = document.getElementById("statusTheme");

function updateStatusTheme(theme) {
  if (statusTheme) {
    statusTheme.textContent = theme === "light" ? "Light+ (default)" : "Dark+ (default)";
  }
}

updateStatusTheme(document.documentElement.getAttribute("data-theme"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateStatusTheme(next);
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Copy-to-clipboard for contact email
document.querySelectorAll(".contact-copy").forEach((btn) => {
  const original = btn.textContent;
  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      btn.textContent = "✓";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1500);
    } catch (err) {
      /* Clipboard API unavailable; mailto link remains the fallback. */
    }
  });
});

// Reveal-on-scroll animations
const animatedEls = document.querySelectorAll("[data-animate]");
if (animatedEls.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.06}s`;
    observer.observe(el);
  });
} else {
  animatedEls.forEach((el) => el.classList.add("is-visible"));
}

// Scroll-spy: highlight the nav tab for the section currently in view
const sectionLinks = navLinks
  ? Array.from(navLinks.querySelectorAll("a:not(.lang-switch a)"))
  : [];
const spiedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sectionLinks.length && spiedSections.length && "IntersectionObserver" in window) {
  const setActiveLink = (id) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const ratios = new Map(spiedSections.map((section) => [section.id, 0]));

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = null;
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) {
        setActiveLink(bestId);
      }
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  spiedSections.forEach((section) => spyObserver.observe(section));

  // Edge case: the last section can be shorter than the observer's dead
  // zone, so force it active once the user reaches the bottom of the page.
  const lastLink = sectionLinks[sectionLinks.length - 1];
  window.addEventListener(
    "scroll",
    () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && lastLink) {
        setActiveLink(lastLink.getAttribute("href").slice(1));
      }
    },
    { passive: true }
  );
}

// ---------------------------------------------------------------------------
// Experience detail modal
// Keeps the timeline scannable (one-line summary per role) while the full
// bullet list stays available on demand via a lightweight modal dialog.
// ---------------------------------------------------------------------------
(function setupExperienceModal() {
  const modal = document.getElementById("expModal");
  if (!modal) return;

  const dialog = modal.querySelector(".modal");
  const titleEl = modal.querySelector(".modal-title");
  const metaEl = modal.querySelector(".modal-meta");
  const listEl = modal.querySelector(".modal-list");
  const closeBtn = modal.querySelector(".modal-close");
  let lastFocused = null;

  function openModal(item) {
    const title = item.querySelector("h3")?.textContent ?? "";
    const meta = item.querySelector(".timeline-meta")?.textContent ?? "";
    const detail = item.querySelector(".timeline-detail");

    titleEl.textContent = title;
    metaEl.textContent = meta;
    listEl.innerHTML = detail ? detail.innerHTML : "";

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  }

  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => openModal(item));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(item);
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  dialog.addEventListener("click", (event) => event.stopPropagation());
})();

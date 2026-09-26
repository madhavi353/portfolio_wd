// =========================
// Madhavi Latha Portfolio JS
// =========================

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const reveals = document.querySelectorAll(".reveal");

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Sticky navbar styling
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// Active navigation link
const updateActiveNav = () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Reveal elements on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => observer.observe(element));

// Certificate search and visible result count
const certificateSearch = document.getElementById("certificate-search");
const certificateCards = document.querySelectorAll(".cert-card");
const certificateCount = document.getElementById("certificate-count");
const noCertificates = document.getElementById("no-certificates");

certificateSearch?.addEventListener("input", () => {
  const query = certificateSearch.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  certificateCards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLocaleLowerCase() ?? "";
    const matches = title.includes(query);
    card.hidden = !matches;

    if (matches) {
      visibleCount += 1;
      card.classList.add("visible");
    }
  });

  if (certificateCount) {
    certificateCount.textContent = `${visibleCount} ${visibleCount === 1 ? "certificate" : "certificates"}`;
  }

  if (noCertificates) {
    noCertificates.hidden = visibleCount > 0;
  }
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

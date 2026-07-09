export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("nav");
    const navElements = document.getElementById("ul");

    if (hamburger && navbar) {
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.setAttribute("aria-expanded", "true");
        navbar.classList.add("open");
        if (navElements) navElements.classList.add("d-block");
        hamburger.classList.add("d-none");
        document.body.classList.add("ov-hidden");

        const links = navElements ? navElements.querySelectorAll("a") : [];
        if (links.length > 0) {
          let firstEl = links[0];
          let lastEl = links[links.length - 1];

          navbar.addEventListener("keydown", (e) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
              if (document.activeElement === firstEl) {
                lastEl.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastEl) {
                firstEl.focus();
                e.preventDefault();
              }
            }
          });
        }
      });

      navbar.addEventListener("click", (e) => {
        hamburger.setAttribute("aria-expanded", "false");
        navbar.classList.remove("open");
        if (navElements) navElements.classList.remove("d-block");
        hamburger.classList.remove("d-none");
        document.body.classList.remove("ov-hidden");
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && hamburger && navbar) {
        hamburger.setAttribute("aria-expanded", "false");
        navbar.classList.remove("open");
        if (navElements) navElements.classList.remove("d-block");
        hamburger.classList.remove("d-none");
        document.body.classList.remove("ov-hidden");
      }
    });
  });
}

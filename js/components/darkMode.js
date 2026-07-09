export function init() {
  const savedTheme = localStorage.getItem("theme");
  const rootElement = document.documentElement; // Targets the <html> element

  if (savedTheme === "dark") {
    rootElement.setAttribute("data-theme", "dark");
  } else {
    rootElement.setAttribute("data-theme", "light");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    if (!toggleButton) return;

    const currentTheme = rootElement.getAttribute("data-theme");
    toggleButton.setAttribute(
      "aria-pressed",
      currentTheme === "dark" ? "true" : "false",
    );

    toggleButton.addEventListener("click", () => {
      const isDarkNow = rootElement.getAttribute("data-theme") === "dark";

      if (isDarkNow) {
        // Switch to Light Mode
        rootElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleButton.setAttribute("aria-pressed", "false");
      } else {
        // Switch to Dark Mode
        rootElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleButton.setAttribute("aria-pressed", "true");
      }
    });
  });
}

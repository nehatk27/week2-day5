const handleIntersection = (entries, guard) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      guard.unobserve(entry.target);
    }
  });
};

const observerOptions = {
  root: null, // Use the main screen viewport
  threshold: 0.5, // Trigger when 50% of the element is visible
};
const animatorObserver = new IntersectionObserver(
  handleIntersection,
  observerOptions,
);

const headings = document.querySelectorAll("main h2");
const articles = document.querySelectorAll(".fade-in-element");

// for home page animation
const blockquotes = document.querySelectorAll("blockquote");
blockquotes.forEach((blockquote) => animatorObserver.observe(blockquote));

headings.forEach((heading) => animatorObserver.observe(heading));
articles.forEach((article) => animatorObserver.observe(article));

// -----Progress bar------
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const currentScroll = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight;
  const screenHeight = window.innerHeight;
  const scrollableDistance = totalHeight - screenHeight;
  if (scrollableDistance <= 0) return;

  const scrollPercentage = (currentScroll / scrollableDistance) * 100;

  progressBar.style.width = `${scrollPercentage}%`;
});

// ----- Back to Top Button  -----
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

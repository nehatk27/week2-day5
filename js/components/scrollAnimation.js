const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      const hiddenHeading = entry.target.querySelector("h2");
      if (hiddenHeading) {
        hiddenHeading.style.opacity = "1";
        hiddenHeading.style.transform = "translateY(0)";
      }

      observer.unobserve(entry.target);
    }
  });
};

const observerOptions = {
  root: null, // Use the main screen viewport
  threshold: 0.1, // Trigger as soon as 10% of the element is visible
};
const animatorObserver = new IntersectionObserver(
  handleIntersection,
  observerOptions,
);

function observeStaticElements() {
  const headings = document.querySelectorAll("main h2");
  const articles = document.querySelectorAll(
    ".fade-in-element, .article-container",
  );
  const blockquotes = document.querySelectorAll("blockquote");

  blockquotes.forEach((blockquote) => animatorObserver.observe(blockquote));
  headings.forEach((heading) => animatorObserver.observe(heading));
  articles.forEach((article) => animatorObserver.observe(article));
}

observeStaticElements();

// Track newly loaded dynamic API cards
document.addEventListener("servicesContentReady", () => {
  const dynamicCards = document.querySelectorAll(
    "#fictional-services .article-container",
  );
  dynamicCards.forEach((card) => {
    animatorObserver.observe(card);

    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.classList.add("visible");
      const hiddenHeading = card.querySelector("h2");
      if (hiddenHeading) {
        hiddenHeading.style.opacity = "1";
        hiddenHeading.style.transform = "translateY(0)";
      }
    }
  });
});

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

document.dispatchEvent(new CustomEvent("servicesContentReady"));

document.addEventListener("teamDataReady", () => {
  const dynamicTeamCards = document.querySelectorAll(".fade-in-element");
  dynamicTeamCards.forEach((card) => {
    animatorObserver.observe(card);

    const position = card.getBoundingClientRect();
    if (position.top < window.innerHeight && position.bottom > 0) {
      card.classList.add("visible");
    }
  });
});

document.dispatchEvent(new CustomEvent("teamDataReady"));

document.addEventListener("homeDataReady", () => {
  const newsCards = document.querySelectorAll("#latest-container article");
  newsCards.forEach((card) => {
    animatorObserver.observe(card);

    const bounds = card.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      card.classList.add("visible");
    }
  });
});

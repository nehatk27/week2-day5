const SERVICES_API_URL =
  "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=9";
const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";
const RECENT_POSTS_API_URL =
  "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3";

export function init() {
  function renderFailureState(container, label, errMessage, retryCallback) {
    if (!container) return;
    container.innerHTML = `
    <div class="inline-error-banner">
      <p> ${label}: ${errMessage}</p>
      <button id="retry-services-btn">Retry Loading</button>
    </div>`;
    document
      .getElementById("retry-services-btn")
      .addEventListener("click", retryCallback);
  }

  function renderServicesSkeleton(container, count = 3) {
    if (!container) return;
    container.innerHTML = "";
    let skeletonHtml = "";
    for (let i = 0; i < count; i++) {
      skeletonHtml += `
      <article class="article-container" style="background:#fff; padding:32px; border-radius:8px;">
        <div class="skeleton-shimmer" style="height:24px; width:70%; margin-bottom:16px;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:100%; margin-bottom:8px;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:85%; margin-bottom:8px;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:40%;"></div>
      </article>`;
    }
    container.insertAdjacentHTML("beforeend", skeletonHtml);
  }

  async function fetchAndRenderServices() {
    const fictionalContainer = document.getElementById("fictional-services");
    if (!fictionalContainer) return;

    renderServicesSkeleton(fictionalContainer, 3);

    try {
      const response = await fetch(SERVICES_API_URL);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const posts = await response.json();

      fictionalContainer.innerHTML = "";

      posts.forEach((post) => {
        const card = document.createElement("article");
        card.classList.add("article-container");

        const title = document.createElement("h2");
        const body = document.createElement("p");

        title.textContent =
          post.title.charAt(0).toUpperCase() + post.title.slice(1);
        body.textContent = post.body;

        card.appendChild(title);
        card.appendChild(body);
        fictionalContainer.appendChild(card);
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent("servicesContentReady"));
        }, 50);
      });
    } catch (error) {
      console.error("API Failure:", error);
      renderFailureState(
        fictionalContainer,
        "Data Connection Issue",
        "Could not load dynamic services feed.",
        fetchAndRenderServices,
      );
    }
  }

  function renderTeamSkeletons(box, count = 2) {
    if (!box) return;
    box.innerHTML = "";
    let html = "";
    for (let i = 0; i < count; i++) {
      html += `
      <figure style="background: var(--shade-2); padding:20px; border-radius: 4.5rem 0 1.5rem; border: 1px solid var(--text-color);">
        <div class="skeleton-shimmer" style="width:180px; height:180px; border-radius:50%; margin:0 auto 1rem;"></div>
        <div class="skeleton-shimmer" style="height:22px; width:70%; margin:0 auto 1rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:50%; margin:0 auto 1rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:90%; margin-bottom:0.5rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:75%;"></div>
      </figure>`;
    }
    box.insertAdjacentHTML("beforeend", html);
  }

  async function fetchAndRenderTeam() {
    const devDynamicContainer = document.getElementById("dev-dynamic-team");
    const opsDynamicContainer = document.getElementById("ops-dynamic-team");

    if (!devDynamicContainer && !opsDynamicContainer) return;

    renderTeamSkeletons(devDynamicContainer, 2);
    renderTeamSkeletons(opsDynamicContainer, 2);

    try {
      const response = await fetch(USERS_API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const users = await response.json();

      if (devDynamicContainer) devDynamicContainer.innerHTML = "";
      if (opsDynamicContainer) opsDynamicContainer.innerHTML = "";

      users.forEach((user) => {
        let department = user.id % 2 === 0 ? "dev" : "operations";
        let role = "";
        let bio = `Tech specialist at ${user.company.name}. Experiencing in crafting robust enterprise scale tools.`;
        let imgSrc = `https://placeholdpicsum.dev/photo/id/${600 + user.id}/300`;

        if (department === "dev") {
          role =
            user.id === 2 ? "Senior Frontend Engineer" : "Software Developer";
        } else {
          role =
            user.id === 1
              ? "Technical Operations Manager"
              : "Systems Administrator";
        }

        const figureCardHtml = `
        <figure class="fade-in-element">
          <img src="${imgSrc}" alt="${user.name}" />
          <figcaption><h3>${user.name}</h3></figcaption>
          <p><strong>${role}</strong></p>
          <p>${bio}</p>
          <div class="socials" style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center;">
            <a href="#" aria-label="LinkedIn-icon"><i class="icon fa-brands fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram-icon"><i class="icon fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Twitter-icon"><i class="icon fa-brands fa-x-twitter"></i></a>
          </div>
        </figure>
      `;

        if (department === "dev" && devDynamicContainer) {
          devDynamicContainer.insertAdjacentHTML("beforeend", figureCardHtml);
        } else if (department === "operations" && opsDynamicContainer) {
          opsDynamicContainer.insertAdjacentHTML("beforeend", figureCardHtml);
        }
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent("teamDataReady"));
        }, 50);
      });
    } catch (error) {
      console.error("Team API failure:", error);
      if (devDynamicContainer)
        renderFailureState(
          devDynamicContainer,
          "Team Load Error",
          "Could not sync roster data.",
          fetchAndRenderTeam,
        );

      if (opsDynamicContainer) opsDynamicContainer.innerHTML = "";
    }
  }

  function renderNewsSkeletons(box, count = 3) {
    if (!box) return;
    box.innerHTML = "";
    let html = "";
    for (let i = 0; i < count; i++) {
      html += `
      <article style="background: var(--white, #fff); padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgb(0 0 0 / 5%); border-top: 4px solid var(--shade-3);">
        <div class="skeleton-shimmer" style="height:24px; width:75%; margin-bottom:1rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:100%; margin-bottom:0.5rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:90%; margin-bottom:0.5rem;"></div>
        <div class="skeleton-shimmer" style="height:14px; width:40%;"></div>
      </article>`;
    }
    box.insertAdjacentHTML("beforeend", html);
  }

  async function fetchAndRenderRecentPosts() {
    const newsContainer = document.getElementById("latest-container");
    if (!newsContainer) return;

    renderNewsSkeletons(newsContainer, 3);

    try {
      const response = await fetch(RECENT_POSTS_API_URL);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const recentPosts = await response.json();

      newsContainer.innerHTML = "";

      recentPosts.forEach((post) => {
        const newsCard = document.createElement("article");
        newsCard.classList.add("fade-in-element");

        const cardTitle = document.createElement("h3");
        const cardBody = document.createElement("p");

        cardTitle.textContent =
          post.title.charAt(0).toUpperCase() + post.title.slice(1);
        cardBody.textContent = post.body;

        cardTitle.style.cssText =
          "color: var(--shade-4); margin-bottom: 0.75rem;";
        cardBody.style.cssText =
          "color: var(--text-color); line-height: 1.6; margin: 0;";

        newsCard.appendChild(cardTitle);
        newsCard.appendChild(cardBody);
        newsContainer.appendChild(newsCard);
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent("homeDataReady"));
        }, 50);
      });
    } catch (error) {
      console.error("News API failure:", error);
      renderFailureState(
        newsContainer,
        "News Feed Error",
        "Unable to populate news dashboard feed.",
        fetchAndRenderRecentPosts,
      );
    }
  }

  fetchAndRenderRecentPosts();
  fetchAndRenderTeam();
  fetchAndRenderServices();
}

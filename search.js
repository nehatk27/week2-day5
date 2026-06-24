document.addEventListener("DOMContentLoaded", () => {
  const wholeData = document.querySelectorAll(".article-container");
  let searchInput = document.getElementById("search-input");
  let clearbutton = document.getElementById("clear-btn");
  let notmatch = document.getElementById("no-results");

  let typingTimer;
  let typeInterval = 300;

  const originalHTMLs = [];
  for (var i = 0; i < wholeData.length; i++) {
    originalHTMLs.push(wholeData[i].innerHTML);
  }

  function liveSearch() {
    let searchWord = document.getElementById("search-input").value.trim();

    if (searchWord.length > 0) {
      clearbutton.classList.remove("hidden");
    } else {
      clearbutton.classList.add("hidden");
    }

    let matchCount = 0;

    for (var i = 0; i < wholeData.length; i++) {
      wholeData[i].innerHTML = originalHTMLs[i];

      if (
        wholeData[i].textContent
          .toLowerCase()
          .includes(searchWord.toLowerCase())
      ) {
        wholeData[i].classList.remove("hidden");
        matchCount++;

        if (searchWord !== "") {
          const cleanQuery = searchWord.replace(
            /[-\/\\^$*+?.()|[\]{}]/g,
            "\\$&",
          );

          const regex = new RegExp(`(${cleanQuery})`, "gi");
          wholeData[i].innerHTML = originalHTMLs[i].replace(
            regex,
            '<span class="highlight">$1</span>',
          );
        }
      } else {
        wholeData[i].classList.add("hidden");
      }
    }
    if (matchCount === 0 && searchWord !== "") {
      notmatch.classList.remove("hidden");
    } else {
      notmatch.classList.add("hidden");
    }
  }

  searchInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
  });

  clearbutton.addEventListener("click", () => {
    searchInput.value = "";
    liveSearch();
    searchInput.focus();
  });
});

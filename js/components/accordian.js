let accBtns = document.querySelectorAll(".accordian-button");
let btnArray = Array.from(accBtns);
let savedIndex = sessionStorage.getItem("openAccordionIndex");

if (savedIndex !== null) {
  let parsedIndex = parseInt(savedIndex, 10);
  if (parsedIndex >= 0 && parsedIndex < accBtns.length) {
    accBtns[parsedIndex].setAttribute("aria-expanded", "true");
    accBtns[parsedIndex].nextElementSibling.classList.remove("hidden");
  }
}

accBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let isOpen = btn.getAttribute("aria-expanded") === "true";
    let currentIndex = btnArray.indexOf(btn);

    accBtns.forEach((otherBtn) => {
      otherBtn.setAttribute("aria-expanded", "false");
      otherBtn.nextElementSibling.classList.add("hidden");
    });

    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      btn.nextElementSibling.classList.remove("hidden");
      sessionStorage.setItem("openAccordionIndex", currentIndex);
    } else {
      sessionStorage.removeItem("openAccordionIndex");
    }
  });

  btn.addEventListener("keydown", (e) => {
    let currentIndex = btnArray.indexOf(btn);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      let nextIndex = (currentIndex + 1) % btnArray.length;
      btnArray[nextIndex].focus();
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      let prevIndex = (currentIndex - 1 + btnArray.length) % btnArray.length;
      btnArray[prevIndex].focus();
    } else if (e.key == "Home") {
      e.preventDefault();
      btnArray[0].focus();
    } else if (e.key == "End") {
      e.preventDefault();
      btnArray[btnArray.length - 1].focus();
    }
  });
});
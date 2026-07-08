export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export async function fetchJSON(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export function showToast(type, msg, delay) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  let box = document.createElement("div");
  box.classList.add("toast", `toast-${type}`);
  const toastMsg = document.createElement("p");
  toastMsg.classList.add("toast-msg");
  toastMsg.textContent = msg;

  toastContainer.appendChild(box);
  box.appendChild(toastMsg);

  setTimeout(() => box.remove(), delay);
}

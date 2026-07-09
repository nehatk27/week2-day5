export function init() {
  const navBar = document.getElementById("nav");
  navBar.innerHTML = `
    <ul id="ul">
        <li><a href="./home.html">Home</a></li>
        <li><a href="./about.html">About</a></li>
        <li><a href="./services.html">Services</a></li>
        <li><a href="./team.html">Team</a></li>
        <li><a href="./contact.html">Contact</a></li>
        <li><a href="./gallery.html">Gallery</a></li>
        <li><a href="./blog.html">Blogs</a></li>
    </ul>
    <button id="theme-toggle" aria-label="Toggle Dark Mode" aria-pressed="false">
        Toggle Theme
    </button>

    <button id="hamburger" aria-expanded="false">&#9776;</button>
`;
}

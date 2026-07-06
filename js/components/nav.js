const navBar = document.querySelector("nav");
navBar.innerHTML = `
    <ul>
        <li><a href="./home.html">Home</a></li>
        <li><a href="./about.html">About</a></li>
        <li><a href="./services.html">Services</a></li>
        <li><a href="./team.html">Team</a></li>
        <li><a href="./contact.html" aria-current="page">Contact</a></li>
    </ul>
`;

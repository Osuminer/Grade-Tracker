// Mobile Burger Menu
const burgerIcon = document.getElementById("burger");
const navbarMenu = document.getElementById("nav-links");

burgerIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
});

// Redirect Button
const button = document.getElementById("navbarRedirectButton");
button.addEventListener("click", () => {
  window.location.href = "../navbar-test/navbar.html";
});

// Login Button
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => {
  window.location.href = "../login/login.html";
});

// Test Button
const testButton = document.getElementById("testButton");
const columns = document.getElementById("testing");

testButton.addEventListener("click", () => {
  const newDiv = document.createElement("div");
	newDiv.classList.add("column")

  const newP = document.createElement("p");

  newP.innerText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet incidunt ipsam cupiditate nihil illo atque iusto omnis ducimus tempore officiis.";

  newDiv.appendChild(newP);
	
  // Append the new div to the parent div
  columns.appendChild(newDiv);
});

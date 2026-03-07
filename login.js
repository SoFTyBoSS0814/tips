const users = [
  { name: "Niko", password: "Niko123" },
  { name: "Mark", password: "Mark123" },
  { name: "default", password: "default" }
  
];

function checkLogin() {
  const nameInput = prompt("Add meg a neved:").trim();
  const passwordInput = prompt("Add meg a jelszót:").trim();

  const user = users.find(u => u.name === nameInput && u.password === passwordInput);

  if (!user) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";
  } else {
    // Mentés sessionStorage-ba (csak az adott böngészőfülre vonatkozik)
    sessionStorage.setItem("loggedInUser", JSON.stringify({ name: user.name }));

    alert(`Üdvözöllek, ${user.name}!`);

    loadTipsScript();
  }
}

function loadTipsScript() {
  const script = document.createElement("script");
  script.src = "tips.js";
  document.body.appendChild(script);
}

// Ellenőrzés, hogy már be vagyunk-e jelentkezve sessionStorage-ban
function checkSession() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loadTipsScript();
  } else {
    checkLogin();
  }
}

checkSession();

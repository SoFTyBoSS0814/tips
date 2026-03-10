// login.js

// Felhasználók listája
const users = [
  { name: "admin", password: "zino" },
  { name: "Mark", password: "Mark123" },
  { name: "demo", password: "demo" },

  // új user lejárattal
  { name: "user1", password: "pass", expiry: "2026-03-10T05:46:00" }
];

// Bejelentkezés ellenőrzése
function checkLogin() {
  const nameInput = prompt("Add meg a neved:").trim();
  const passwordInput = prompt("Add meg a jelszót:").trim();

  console.log("Beírt név:", nameInput);
  console.log("Beírt jelszó:", passwordInput);

  const user = users.find(u => u.name === nameInput && u.password === passwordInput);

  if (!user) {
    console.log("Nem található felhasználó");
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";
    return;
  }

  // tagság lejárat ellenőrzése
  if (user.expiry) {
    const expiryDate = new Date(user.expiry);
    const now = new Date();

    if (now >= expiryDate) {
      alert("Lejárt a tagságod! DC-n keresd fel Zinoviyt!");
      return;
    }
  }

  console.log("Felhasználó megtalálva:", user.name);

  // Mentés sessionStorage-ba
  sessionStorage.setItem("loggedInUser", JSON.stringify({ name: user.name }));

  alert(`Üdvözöllek, ${user.name}!`);

  loadTipsScript();
}

// Dinamikusan betölti a tips.js-t
function loadTipsScript() {
  const script = document.createElement("script");
  script.src = "tips.js";
  document.body.appendChild(script);
}

// Ellenőrzi, hogy van-e már bejelentkezett sessionStorage-ban
function checkSession() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loadTipsScript();
  } else {
    checkLogin();
  }
}

// Azonnal lefuttatjuk az ellenőrzést
checkSession();

// login.js

// Példa felhasználók
const users = [
  { id: "4u83rj38", name: "Niko", password: "Niko123" },
  { id: "7k12lmn9", name: "Anna Kovács", password: "titkos" }
];

// Funkció a login ellenőrzésére
function checkLogin() {
  const username = prompt("Add meg a felhasználói ID-t:");
  const password = prompt("Add meg a jelszót:");

  // Ellenőrizzük, hogy van-e ilyen felhasználó
  const user = users.find(u => u.id === username && u.password === password);

  if (!user) {
    // Ha nincs, felülírjuk az oldalt
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";
  } else {
    // Ha van, üdvözöljük a felhasználót
    alert(`Üdvözöllek, ${user.name}!`);
    // Itt töltődhet be a tips.js (ha defer-el van behúzva)
  }
}

// Azonnal lefuttatjuk a login ellenőrzést az oldal betöltésekor
checkLogin();

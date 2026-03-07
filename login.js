// login.js

// Felhasználók tömbje
const users = [
  { id: "4u83rj38", name: "Niko", password: "Niko123" },
  { id: "7k12lmn9", name: "Anna Kovács", password: "titkos" }
];

// Login ellenőrző funkció
function checkLogin() {
  // Prompt: most már "name"-et kérünk
  const nameInput = prompt("Add meg a neved:").trim();
  const passwordInput = prompt("Add meg a jelszót:").trim();

  // Ellenőrizzük a name + password párost
  const user = users.find(u => u.name === nameInput && u.password === passwordInput);

  if (!user) {
    // Hibás login → felülírjuk az oldalt
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";
  } else {
    // Sikeres login → üdvözlés és tips.js betöltése
    alert(`Üdvözöllek, ${user.name}!`);

    // Dinamikusan betöltjük a tips.js-t
    const script = document.createElement("script");
    script.src = "tips.js";
    document.body.appendChild(script);
  }
}

// Azonnal lefuttatjuk a login ellenőrzést
checkLogin();

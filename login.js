// login.js

// Felhasználók listája
const users = [
  { id: "4u83rj38", name: "Niko", password: "Niko123" },
  { id: "7k12lmn9", name: "Mark", password: "Mark123" }
];

// Login ellenőrző függvény
function checkLogin() {
  // Prompt a név és jelszó bekéréséhez, trim a szóközök eltávolításához
  const nameInput = prompt("Add meg a neved:").trim();
  const passwordInput = prompt("Add meg a jelszót:").trim();

  // Ellenőrizzük, hogy van-e felhasználó a name + password párossal
  const user = users.find(u => u.name === nameInput && u.password === passwordInput);

  if (!user) {
    // Hibás login → LOGIN REQUIRED üzenet
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";
  } else {
    // Sikeres login → üdvözlés
    alert(`Üdvözöllek, ${user.name}!`);

    // Dinamikusan betöltjük a tips.js-t
    const script = document.createElement("script");
    script.src = "tips.js";
    document.body.appendChild(script);
  }
}

// Azonnal lefuttatjuk a login ellenőrzést
checkLogin();

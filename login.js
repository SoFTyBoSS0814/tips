// login.js

// Felhasználók listája
const users = [
  { name: "admin", password: "zino" },
  { name: "Mark", password: "Mark123" },
  { name: "demo", password: "demo", duration: "1week" }
];


// duration -> expiry számítás
function calculateExpiry(duration) {

  const now = new Date();

  if (duration === "1week") {
    now.setDate(now.getDate() + 7);
  }

  if (duration === "2week") {
    now.setDate(now.getDate() + 14);
  }

  if (duration === "1month") {
    now.setMonth(now.getMonth() + 1);
  }

  if (duration === "2month") {
    now.setMonth(now.getMonth() +2);
  }

  return now;
}


// Bejelentkezés
function checkLogin() {

  const nameInput = prompt("Add meg a neved:").trim();
  const passwordInput = prompt("Add meg a jelszót:").trim();

  console.log("Beírt név:", nameInput);
  console.log("Beírt jelszó:", passwordInput);

  const user = users.find(u => u.name === nameInput && u.password === passwordInput);

  if (!user) {

    console.log("Nem található felhasználó");

    document.body.innerHTML =
      "<h1 style='text-align:center;margin-top:50px;'>LOGIN REQUIRED</h1>";

    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.background = "#f5f5f5";

    return;
  }


  // expiry lekérdezése localStorage-ból
  let expiry = localStorage.getItem("expiry_" + user.name);


  // ha még nincs expiry -> kiszámoljuk duration alapján
  if (!expiry && user.duration) {

    const expiryDate = calculateExpiry(user.duration);

    expiry = expiryDate.toISOString();

    localStorage.setItem("expiry_" + user.name, expiry);

  }


  // lejárat ellenőrzés
  if (expiry) {

    const expiryDate = new Date(expiry);
    const now = new Date();

    if (now >= expiryDate) {

      alert("Lejárt a tagságod! DC-n keresd fel Zinoviyt!");

      return;

    }

  }


  console.log("Felhasználó megtalálva:", user.name);


  // session mentése
  sessionStorage.setItem(
    "loggedInUser",
    JSON.stringify({ name: user.name })
  );


  alert(`Üdvözöllek, ${user.name}!`);


  loadTipsScript();

}



// tips.js betöltése
function loadTipsScript() {

  const script = document.createElement("script");

  script.src = "tips.js";

  document.body.appendChild(script);

}



// session ellenőrzés
function checkSession() {

  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {

    const userData = JSON.parse(loggedInUser);

    const expiry = localStorage.getItem("expiry_" + userData.name);

    if (expiry) {

      const expiryDate = new Date(expiry);
      const now = new Date();

      if (now >= expiryDate) {

        alert("Lejárt a tagságod! DC-n keresd fel Zinoviyt!");

        sessionStorage.clear();

        checkLogin();

        return;

      }

    }

    loadTipsScript();

  } else {

    checkLogin();

  }

}


// indulás
checkSession();

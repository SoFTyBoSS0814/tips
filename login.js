const users = [
  { id: "4u83rj38", name: "Niko", password: "Niko123" },
  { id: "7k12lmn9", name: "Mark", password: "Mark123" }
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
    alert(`Üdvözöllek, ${user.name}!`);
    const script = document.createElement("script");
    script.src = "tips.js";
    document.body.appendChild(script);
  }
}

checkLogin();

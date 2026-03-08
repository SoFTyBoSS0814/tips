// Tippjeink betöltése a JSON fájlból
fetch("tips.json")
  .then(res => res.json())
  .then(tips => {
    tips.forEach(tip => {
      // MECCS KONSTRUKCIÓ
      const div = document.createElement("div");
      div.className = "tip";

      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      div.appendChild(title);

      // Hova kerül a meccs: Tippek vagy Eredmények
      const now = new Date();
      const matchTime = new Date(tip.start_time);

      // Ha a meccs már elindult vagy lezárult, akkor a lejátszott meccsek közé kerül
      if (matchTime < now) {
        // Lejátszott meccsek
        document.getElementById("results-container").appendChild(div);
      } else {
        // Aktív tippek
        document.getElementById("tips-container").appendChild(div);
      }

      // Ha a meccs kezdete 12 órán belül van, "Új!" címke hozzáadása
      const newTag = document.createElement("span");
      const twelveHoursInMs = 12 * 60 * 60 * 1000;
      const isNewMatch = now - matchTime <= twelveHoursInMs;
      if (isNewMatch) {
        newTag.className = "new-tag";  // Stílus az "Új!" címkéhez
        newTag.textContent = "Új!";
        div.appendChild(newTag);
      }
    });
  })
  .catch(error => {
    console.error("JSON betöltési hiba:", error);
  });

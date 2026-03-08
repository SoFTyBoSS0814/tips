fetch("tips.json")
  .then(res => res.json())
  .then(tips => {
    tips.forEach(tip => {

      // MECCS KONSTRUKCIÓ
      const div = document.createElement("div");
      div.className = "tip";

      // TIPP CÍM: A meccs neve és győztesének kiírása
      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      div.appendChild(title);

      // MECCS ID alapján API hívás az eredményhez
      fetch(`https://YOUR_CRICKET_API/match/${tip.match_id}?apikey=API_KEY`)
        .then(res => res.json())
        .then(apiData => {
          if(apiData.status === "completed") {
            const resultP = document.createElement("p");
            resultP.innerHTML = `<strong>Eredmény:</strong> ${apiData.winner} nyert ${apiData.runs} futással, ${apiData.wickets} wicket-tel`;
            div.appendChild(resultP);
          }
        });

      // Hova kerül: Tippek vagy Eredmények
      const now = new Date();
      const matchTime = new Date(tip.start_time);

      let durationMinutes = 180; // alap 3 óra
      switch((tip.type || "").toUpperCase()) {
        case "T1": durationMinutes = 2; break;
        case "T10": durationMinutes = 150; break;
        case "T20": durationMinutes = 270; break;
        case "ODI": durationMinutes = 480; break;
      }

      const matchEnd = new Date(matchTime.getTime() + durationMinutes*60*1000);
      const container = matchEnd < now ? 
                        document.getElementById("results-container") : 
                        document.getElementById("tips-container");

      container.appendChild(div);
    });
  });

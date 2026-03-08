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

      // MECCS ID alapján API hívás az eredményhez
      const matchId = tip.match_id;  // Feltételezzük, hogy van match_id a tippekben
      fetch(`https://cricketdata.org/api/matches/${matchId}?apikey=02e57ffc-a5b6-42e3-b805-c6a0e5fc712c`)
        .then(res => res.json())
        .then(apiData => {

          // Ha a mérkőzés nem kezdődött el
          if (apiData.status === "Match not started") {
            const statusP = document.createElement("p");
            statusP.innerHTML = `<strong>Státusz:</strong> A mérkőzés még nem kezdődött el.`;
            div.appendChild(statusP);
          }

          // Ha a mérkőzés már befejeződött
          if (apiData.matchEnded) {
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
        case "T10": durationMinutes = 150; break;
        case "T20": durationMinutes = 270; break;
        case "ODI": durationMinutes = 480; break;
      }

      const matchEnd = new Date(matchTime.getTime() + durationMinutes * 60 * 1000);

      // Ha a meccs már elindult vagy lezárult, akkor a lejátszott meccsek közé kerül
      if (matchEnd < now) {
        // Lejátszott meccsek
        document.getElementById("results-container").appendChild(div);
      } else {
        // Aktív tippek
        document.getElementById("tips-container").appendChild(div);
      }
    });
  });

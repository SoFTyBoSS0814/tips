fetch("tips.json")
  .then(response => response.json())
  .then(tips => {
    // Időrendi sorrend
    tips.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    const container = document.getElementById("tips-container");

    tips.forEach(tip => {
      const tipDiv = document.createElement("div");
      tipDiv.className = "tip";

      // Meccs és győztes
      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      tipDiv.appendChild(title);

      // Kezdési idő
      const time = document.createElement("p");
      const date = new Date(tip.start_time);
      time.textContent = `Kezdés: ${date.toLocaleString()}`;
      tipDiv.appendChild(time);

      // Stream logika: csak egy legyen
      if (tip.youtube_id) {
        // YouTube Livestream gomb (új ablakban)
        const ytLink = document.createElement("a");
        ytLink.href = `https://www.youtube.com/watch?v=${tip.youtube_id}`;
        ytLink.target = "_blank";
        ytLink.textContent = "YouTube Livestream";
        ytLink.className = "livestream-button";
        tipDiv.appendChild(ytLink);
      } else if (tip.icc_stream) {
        // ICC Livestream gomb
        const iccLink = document.createElement("a");
        iccLink.href = tip.icc_stream;
        iccLink.target = "_blank";
        iccLink.textContent = "ICC Livestream";
        iccLink.className = "livestream-button";
        tipDiv.appendChild(iccLink);
      }

      container.appendChild(tipDiv);
    });
  })
  .catch(error => console.error("Hiba a tippek betöltésénél:", error));

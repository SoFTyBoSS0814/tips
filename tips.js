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

      // Csak egy stream: YouTube vagy ICC
      let linkButton = null;

      if (tip.youtube_id) {
        linkButton = document.createElement("a");
        linkButton.href = `https://www.youtube.com/watch?v=${tip.youtube_id}`;
        linkButton.textContent = "YouTube Livestream";
      } else if (tip.icc_stream) {
        linkButton = document.createElement("a");
        linkButton.href = tip.icc_stream;
        linkButton.textContent = "ICC Livestream";
      }

      if (linkButton) {
        linkButton.target = "_blank";
        linkButton.className = "livestream-button";
        tipDiv.appendChild(linkButton);
      }

      container.appendChild(tipDiv);
    });
  })
  .catch(error => console.error("Hiba a tippek betöltésénél:", error));

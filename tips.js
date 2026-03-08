// Betöltés és megjelenítés
fetch("tips.json?v=" + new Date().getTime()) // cache elkerülése
  .then(res => res.json())
  .then(tips => {
    tips.sort((a,b) => new Date(a.start_time) - new Date(b.start_time)); // Rendezés idő szerint
    tipsContainer.innerHTML = "";

    tips.forEach(tip => {

      const div = document.createElement("div");
      div.className = "tip";

      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      div.appendChild(title);

      const time = document.createElement("p");
      time.textContent = `Kezdés: ${new Date(tip.start_time).toLocaleString("hu-HU")}`;
      div.appendChild(time);

      if(tip.odds){
        const oddsP = document.createElement("p");
        oddsP.textContent = `Odds: ${tip.odds}`;
        oddsP.style.fontWeight = "bold";
        div.appendChild(oddsP);
      }

      // "Új" jelzés hozzáadása
      const now = new Date();
      const startTime = new Date(tip.start_time);
      const hoursDifference = (now - startTime) / (1000 * 60 * 60); // Különbség órában

      if (hoursDifference < 12) {
        const newLabel = document.createElement("span");
        newLabel.textContent = "ÚJ";
        newLabel.style.backgroundColor = "yellow"; // Citromsárga
        newLabel.style.padding = "5px";
        newLabel.style.borderRadius = "3px";
        div.appendChild(newLabel);
      }

      const linksDiv = document.createElement("div");
      linksDiv.className = "links-row";

      const youtubeLink = (tip.youtube_id || "").trim();
      const iccLink = (tip.icc_stream || "").trim();
      const scoreLink = (tip.scorecard || "").trim();

      // YouTube PRIORITÁS: ha van YouTube, csak az jelenik meg
      if (youtubeLink !== "") {
        const yt = document.createElement("a");
        yt.href = youtubeLink;
        yt.textContent = "Youtube Stream";
        yt.target = "_blank";
        yt.className = "livestream-button youtube-button";
        linksDiv.appendChild(yt);
      } else if (iccLink !== "") {
        const icc = document.createElement("a");
        icc.href = iccLink;
        icc.textContent = "ICC Stream";
        icc.target = "_blank";
        icc.className = "livestream-button icc-button";
        linksDiv.appendChild(icc);
      }

      if(scoreLink !== "") {
        const score = document.createElement("a");
        score.href = scoreLink;
        score.textContent = "Scorecard";
        score.target = "_blank";
        score.className = "livestream-button scorecard-button";
        score.style.marginLeft = "auto";
        linksDiv.appendChild(score);
      }

      div.appendChild(linksDiv);
      tipsContainer.appendChild(div);
    });

    tipsContainer.style.display = "block";
  })
  .catch(e => console.error("Hiba a fetch során:", e));

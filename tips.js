
function loadTips() {
  fetch("tips.json")
    .then(res => res.json())
    .then(tips => {
      const container = document.getElementById("tips-container");
      container.innerHTML = "";
      tips.sort((a,b) => new Date(a.start_time) - new Date(b.start_time));

      tips.forEach(tip => {
        const div = document.createElement("div");
        div.className = "tip";

        // Meccs címe és győztes
        const title = document.createElement("h3");
        title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
        div.appendChild(title);

        // Kezdési idő
        const time = document.createElement("p");
        time.textContent = `Kezdés: ${new Date(tip.start_time).toLocaleString("hu-HU")}`;
        div.appendChild(time);

        // Odds, ha van
        if(tip.odds){
          const oddsP = document.createElement("p");
          oddsP.textContent = `Odds: ${tip.odds}`;
          oddsP.style.fontWeight = "bold";
          div.appendChild(oddsP);
        }

        // Linkek konténer (flex)
        const linksDiv = document.createElement("div");
        linksDiv.style.display = "flex";
        linksDiv.style.alignItems = "center";
        linksDiv.style.marginTop = "10px";

        // Bal oldali link: YouTube vagy ICC
        const youtubeId = tip.youtube_id?.trim() || "";
        const iccLink = tip.icc_stream?.trim() || "";
        if (youtubeId) {
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          div.appendChild(iframe);
        } else if (iccLink) {
          const link = document.createElement("a");
          link.href = iccLink;
          link.textContent = "Nézd az ICC streamet";
          link.target = "_blank";
          link.className = "livestream-button";
          linksDiv.appendChild(link);
        }

        // Jobb oldali link: Scorecard
        const scoreLink = tip.scorecard?.trim() || "";
        if (scoreLink) {
          const scoreLinkEl = document.createElement("a");
          scoreLinkEl.href = scoreLink;
          scoreLinkEl.textContent = "Scorecard";
          scoreLinkEl.target = "_blank";
          scoreLinkEl.className = "livestream-button";
          scoreLinkEl.style.marginLeft = "auto"; // jobb oldalra tolás
          linksDiv.appendChild(scoreLinkEl);
        }

        div.appendChild(linksDiv);
        container.appendChild(div);
      });

      container.style.display = "block";
    })
    .catch(e => console.error("Hiba a fetch során:", e));
}

// Azonnali futtatás, ha a felhasználó már bejelentkezett
loadTips();

fetch("tips.json")
  .then(res => res.json())
  .then(tips => {
    const container = document.getElementById("tips-container");
    container.innerHTML = "";
    tips.sort((a,b) => new Date(a.start_time) - new Date(b.start_time));

    tips.forEach(tip => {
      const div = document.createElement("div");
      div.className = "tip";

      // Meccs cím
      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      div.appendChild(title);

      // Kezdési idő
      const time = document.createElement("p");
      time.textContent = `Kezdés: ${new Date(tip.start_time).toLocaleString("hu-HU")}`;
      div.appendChild(time);

      // Odds kiírása
      if (tip.odds) {
        const odds = document.createElement("p");
        odds.textContent = `Odds: ${tip.odds}`;
        div.appendChild(odds);
      }

      // YouTube vagy ICC stream
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
        div.appendChild(link);
      }

      container.appendChild(div);
    });
  })
  .catch(e => console.error("Hiba a fetch során:", e));

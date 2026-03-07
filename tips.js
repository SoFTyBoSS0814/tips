fetch("tips.json")
  .then(response => response.json())
  .then(tips => {
    tips.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    const container = document.getElementById("tips-container");
    container.innerHTML = ""; // Ha újratöltöd, töröld a régieket

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

      if (tip.youtube_id && tip.youtube_id.trim() !== "") {
        // Csak akkor jelenítsd meg az iframe-et, ha van értelmes YouTube ID
        const iframe = document.createElement("iframe");
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = `https://www.youtube.com/embed/${tip.youtube_id}`;
        iframe.title = "YouTube Livestream";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        tipDiv.appendChild(iframe);
      } else if (tip.icc_stream && tip.icc_stream.trim() !== "") {
        // Csak ICC gomb, ha nincs YouTube ID
        const iccLink = document.createElement("a");
        iccLink.href = tip.icc_stream;
        iccLink.target = "_blank";
        iccLink.textContent = "Nézd az ICC streamet";
        iccLink.className = "livestream-button";
        tipDiv.appendChild(iccLink);
      }
      // Ha nincs sem YouTube, sem ICC, nem jelenítünk meg semmit

      container.appendChild(tipDiv);
    });
  })
  .catch(error => console.error("Hiba a tippek betöltésénél:", error));

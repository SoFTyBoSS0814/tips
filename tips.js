fetch("tips.json")
  .then(res => res.json())
  .then(tips => {
    tips.sort((a,b) => new Date(a.start_time) - new Date(b.start_time));
    const container = document.getElementById("tips-container");
    container.innerHTML = "";

    tips.forEach(tip => {
      const div = document.createElement("div");
      div.className = "tip";

      const title = document.createElement("h3");
      title.textContent = `${tip.match} (Győztes: ${tip.winner})`;
      div.appendChild(title);

      const time = document.createElement("p");
      time.textContent = `Kezdés: ${new Date(tip.start_time).toLocaleString()}`;
      div.appendChild(time);

      const title = document.createElement("h3");
      title.textContent = `${odds.match} {Odds: ${odds.match})`;
      div.appendChild(title);

      // Új logika: csak ha tényleges YouTube ID van
      const youtubeId = tip.youtube_id ? tip.youtube_id.trim() : "";
      const iccLink = tip.icc_stream ? tip.icc_stream.trim() : "";

      if (youtubeId !== "") {
        // Csak tényleges ID esetén
        const iframe = document.createElement("iframe");
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        div.appendChild(iframe);
      } else if (iccLink !== "") {
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
  .catch(e => console.error(e));




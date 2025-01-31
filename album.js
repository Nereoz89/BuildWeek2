const addressBarContent = new URLSearchParams(window.location.search);
const albumId = addressBarContent.get("albumId");

const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9ba868c2aamsh86144534c7b4d4ep186d15jsn6d3b9dfa1630",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(`${url}${albumId}`, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Errore: ${res.status} ${res.statusText}`);
    }
  })
  .then((data) => {
    /* console.log(data); */
    generateTracks(data);
    generateDetails(data);
  })
  .catch((err) => {
    console.error(err.message);
  });

const mainRow = document.getElementById("albumContent");
const secondRow = document.getElementById("secondContent");

//  ALBUM DETAILS
const generateDetails = (details) => {
  secondRow.innerHTML = `
  <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
    <!-- Immagine più piccola su dispositivi più grandi -->
    <img src="${details.cover_big}" crossorigin="anonymous" alt="img" 
     class="shadow-lg mb-3 mb-md-0 img-responsive" />
    <div class="d-flex flex-column ms-md-4">
      <h1 class="mt-5 " style="font-size: 3rem; font-weight: bold;">${details.title}</h1>
      <div class="d-flex align-items-center">
        <img src="${details.artist.picture_big}" width="5%" class="rounded-5 me-2" alt="img"/>
        <p class="ms-2 mb-0">${details.artist.name}</p>
        <p class="ms-2 mb-0 d-block d-md-inline">${details.tracks.data.length} brani</p>
        <p class="ms-2 mb-0">${Math.floor(details.duration / 60)}:${details.duration % 60}</p>
      </div>
    </div>
  </div>
`;
};

//  TRACKS
const generateTracks = (tracks) => {
  tracks.tracks.data.forEach((el) => {
    let seconds = el.duration % 60;
    seconds = seconds.toString().padStart(2, "0");
    const options = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };

    const content = document.createElement("div");
    content.classList.add("d-flex", "align-items-center");
    content.innerHTML = `
      <div class="col col-md-8 d-flex justify-content-between ms-4 me-4">
         <div class="detailPlayer" style="cursor: pointer;">
           <h6 class="mb-0 ">${el.title}</h6>
           <p class='text-secondary mt-1' style="font-size: 0.8em;">${el.artist.name}</p>
         </div>
         <div class="d-flex align-items-center">
           <i
             style="font-size: 1.5em"
             class="bi bi-three-dots-vertical d-md-none"
           ></i>
           <p class="mb-0 d-none d-md-block me-3" style="font-size: 0.8em;">
             ${el.rank.toLocaleString("it-IT", options)}
           </p>
         </div>
        </div>
         <div class="col d-flex justify-content-end d-none d-md-flex">
            <p class="mb-0 d-none d-md-block " style="font-size: 0.8em;">
              ${Math.floor(el.duration / 60)}:${seconds}
            </p>
          </div>
      `;
    mainRow.appendChild(content);

    //Player

    const playerImg = document.getElementById("playerCover");

    // Aggiungi l'evento di click al nuovo elemento
    content.querySelector(".detailPlayer").addEventListener("click", () => {
      document.getElementById("playerTitle").textContent = el.title;
      document.getElementById("playerArtist").textContent = el.artist.name;
      playerImg.innerHTML = `<img src="${el.album.cover_medium}" style="max-height: 3em; margin-right: 10px;" />`;
      document.getElementById("playerDuration").textContent = `${Math.floor(el.duration / 60)}:${seconds}`;

      document.getElementById("playButton").addEventListener("click", () => {
        const player = document.getElementById("player");
        if (player.src !== el.preview) {
          player.src = el.preview;
          player.play();
        } else {
          if (player.paused) {
            player.play();
          } else {
            player.pause();
          }
        }
      });

      // Aggiungi evento per aggiornare la barra di avanzamento
      const player = document.getElementById("player");
      player.addEventListener("timeupdate", () => {
        const progressBar = document.getElementById("progressBar");
        const progress = (player.currentTime / player.duration) * 100;
        progressBar.value = progress;
      });

      // Aggiungi evento per controllare il volume
      const volumeControl = document.getElementById("volumeControl");
      volumeControl.addEventListener("input", () => {
        player.volume = volumeControl.value;
      });
    });
  });
};

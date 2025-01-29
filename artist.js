// URL dell'API per caricare i dati dell'album o della traccia
const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/";
const opzioni = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9ba868c2aamsh86144534c7b4d4ep186d15jsn6d3b9dfa1630",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// Ottieni l'ID della traccia dalla query string
const trackId = new URLSearchParams(window.location.search).get("trackId");

// Riferimento agli elementi del player
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const songCover = document.querySelector(".song-cover");
const playButton = document.querySelector(".play-btn");
const progressBar = document.querySelector(".progress-bar");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const volumeSlider = document.querySelector(".volume-slider");
const skipBackButton = document.querySelector(".bi-skip-start-fill");
const skipForwardButton = document.querySelector(".bi-skip-end-fill");

// Variabili di controllo
let isPlaying = false;
let audio = new Audio();

// Funzione per formattare i tempi (es. 3:45)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// Funzione per gestire la riproduzione/pausa
const togglePlayPause = () => {
  if (isPlaying) {
    audio.pause();
    playButton.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
  } else {
    audio.play();
    playButton.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  }
  isPlaying = !isPlaying;
};

// Funzione per aggiornare la barra di progresso
const updateProgress = () => {
  progressBar.value = audio.currentTime;
  currentTimeElem.textContent = formatTime(audio.currentTime);
};

// Funzione per gestire il cambiamento della posizione nella traccia
const seekTrack = () => {
  audio.currentTime = progressBar.value;
};

// Funzione per saltare alla traccia precedente
const skipBack = () => {
  audio.currentTime = 0;
  audio.play();
  playButton.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  isPlaying = true;
};

// Funzione per saltare alla traccia successiva
const skipForward = () => {
  audio.currentTime = 0;
  audio.play();
  playButton.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  isPlaying = true;
};

// Funzione per caricare i dati della traccia
const loadTrack = (trackId) => {
  fetch(`${apiUrl}${trackId}`, opzioni)
    .then((res) => res.json())
    .then((data) => {
      // Imposta il titolo della canzone, l'artista e la copertura
      songTitle.textContent = data.title;
      songArtist.textContent = data.artist.name;
      songCover.src = data.album.cover_medium;

      // Imposta l'audio e la durata totale della traccia
      audio.src = data.preview; // Usa il link del preview della traccia
      audio.addEventListener("loadedmetadata", () => {
        totalTimeElem.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
      });
    })
    .catch((err) => console.error("Errore:", err));
};

// Gestisci l'evento di riproduzione/pausa
playButton.addEventListener("click", togglePlayPause);

// Gestisci l'aggiornamento della barra di progresso
audio.addEventListener("timeupdate", updateProgress);

// Gestisci il cambiamento della posizione nella traccia
progressBar.addEventListener("input", seekTrack);

// Gestisci il salto alla traccia precedente
skipBackButton.addEventListener("click", skipBack);

// Gestisci il salto alla traccia successiva
skipForwardButton.addEventListener("click", skipForward);

// Aggiungi la gestione del volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// Gestisci la fine della traccia (passa alla traccia successiva)
audio.addEventListener("ended", skipForward);

// Carica la traccia all'avvio del player
if (trackId) {
  loadTrack(trackId);
}

const addressBarContent = new URLSearchParams(window.location.search);
const artistId = addressBarContent.get("artistId");

localStorage.setItem("id_artist", artistId);

const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9ba868c2aamsh86144534c7b4d4ep186d15jsn6d3b9dfa1630",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(`${url}${artistId}`, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Errore: ${res.status} ${res.statusText}`);
    }
  })
  .then((data) => {
    console.log(data);
    generateDetails(data);
  })
  .catch((err) => {
    console.error(err.message);
  });

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Errore: ${res.status} ${res.statusText}`);
    }
  })
  .then((data) => {
    console.log(data);
    generateTracks(data);
  })
  .catch((err) => {
    console.error(err.message);
  });

const mainRow = document.getElementById("albumContent");
const secondRow = document.getElementById("secondContent");

// ALBUM DETAILS
const generateDetails = (details) => {
  const options = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  secondRow.innerHTML = `
  <div class="d-flex justify-content-center mt-4">
    <img src="${details.picture_big}" crossorigin="anonymous" alt="img" width="70%" id="myImg"/>
  </div>
  <div class="d-flex flex-column justify-content-end ps-3 ps-md-0">
    <h1 class="mt-4 fs-md-4">${details.name}</h1>
    <p> Ascoltatori mensili: ${details.nb_fan.toLocaleString("it-IT", options)}
  </div>
  `;
};

//  TRACKS
const generateTracks = (tracks) => {
  tracks.data.forEach((el, index) => {
    if (index < 20) {
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
    <div class="col col-md-8 d-flex justify-content-between">
       <div>
         <h6 class="mb-4 pe-3">${el.title}</h6>
       </div>
       <div class="d-flex align-items-center">
         <i
           style="font-size: 1.5em"
           class="bi bi-three-dots-vertical d-md-none"
         ></i>
         <p class="mb-0 d-none d-md-block">${el.rank.toLocaleString("it-IT", options)}</p>
       </div>
      </div>
       <div class="col d-flex justify-content-end d-none d-md-flex">
          <p class="mb-0 d-none d-md-block">${Math.floor(el.duration / 60)}:${seconds}</p>
        </div>
    `;

      mainRow.appendChild(content);
    }
  });
};

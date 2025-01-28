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
    console.log(data);
    generateTracks(data);
  })
  .catch((err) => {
    console.error(err.message);
  });

const mainRow = document.getElementById("albumContent");

// FUNCTION PER GENERARE LE TRACKS
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
      <div class="col col-md-8 d-flex justify-content-between">
         <div>
           <h6 class="mb-0">${el.title}</h6>
           <p class='text-secondary'>${el.artist.name}</p>
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
  });
};

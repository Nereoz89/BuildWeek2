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
    generateDetails(data);
  })
  .catch((err) => {
    console.error(err.message);
  });

const mainRow = document.getElementById("albumContent");
const secondRow = document.getElementById("secondContent");

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
         <div>
           <h6 class="mb-0">${el.title}</h6>
           <p class='text-secondary mt-1' style="font-size: 0.8em;">${el.artist.name}</p>
         </div>
         <div class="d-flex align-items-center">
           <i
             style="font-size: 1.5em"
             class="bi bi-three-dots-vertical d-md-none"
           ></i>
           <p class="mb-0 d-none d-md-block me-3" style="font-size: 0.8em;">${el.rank.toLocaleString(
             "it-IT",
             options
           )}</p>
         </div>
        </div>
         <div class="col d-flex justify-content-end d-none d-md-flex">
            <p class="mb-0 d-none d-md-block " style="font-size: 0.8em;">${Math.floor(el.duration / 60)}:${seconds}</p>
          </div>
      `;
    mainRow.appendChild(content);
  });
};

//  ALBUM DETAILS
const generateDetails = (details) => {
  secondRow.innerHTML = `
  <div class="d-flex justify-content-between align-items-center mt-4">
    <img src="${details.cover_big}" crossorigin="anonymous" alt="img" width="30%" class="shadow-lg" id="myImg"/>
    <div class="d-flex flex-column ms-4">
      <h1 class="mt-5" style="font-size: 3.5rem; font-weight: bold;">${details.title}</h1>
 <div class="d-flex align-items-center">
        <img src="${details.artist.picture_big}" width="5%" class="rounded-5 me-2" alt="img"/>
        <p class="ms-2 mb-0">${details.artist.name}</p>
        <p class="ms-2 mb-0">${details.tracks.data.length} brani</p>
        <p class="ms-2 mb-0">${Math.floor(details.duration / 60)}:${details.duration % 60}</p>
      </div>
    </div>
  </div>
`;
};

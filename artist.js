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

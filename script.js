// RINTRACCIO LA ROW TARGET
const myRow = document.getElementById("mainRow");

let artistArr = [
  "ac-dc",
  "queen",
  "pink-floyd",
  "led-zeppelin",
  "the-rolling-stones",
  "nirvana",
  "metallica",
  "guns-n-roses",
  "bob-dylan",
  "the-who",
  "oasis",
  "coldplay",
  "muse",
  "u2",
];

const getRandomString = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const randomString = getRandomString(artistArr);
console.log(randomString);

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + randomString;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9ba868c2aamsh86144534c7b4d4ep186d15jsn6d3b9dfa1630",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then((data) => {
    console.log("Search", data);
    generateCards(data);
  })
  .catch((err) => {
    console.log(err);
  });

// Generate card

const generateCards = (album) => {
  album.data.forEach((el, index) => {
    if (index < 18) {
      const newCol = document.createElement("div");
      newCol.classList.add("col-12", "col-md-4", "col-lg-2", "my-2", "p-1", "d-flex", "justify-content-center");

      newCol.innerHTML = `
      <div class="card h-100 border-0 p-3" id="albumCard" style="height: 350px;">
        <div class="row g-0 d-flex align-items-center h-100">
          <!-- Colonna per l'immagine -->
          <div class="col-4 col-md-12 d-flex justify-content-center mb-2 mb-md-0">
            <img src="${el.album.cover_big}" class="card-img-top img-fluid mb-md-3 pe-5 pe-md-0" alt="img-${index}" style="object-fit: cover; height: 100%;">
          </div>
          <!-- Colonna per il contenuto (testo) -->
          <div class="col-8 col-md-12 d-flex flex-column justify-content-between align-items-start px-0 text-center text-md-start">
            <h6 class="card-title mb-1">
              <a class="text-decoration-none text-white" href="album.html?albumId=${el.album.id}">
                ${el.album.title}
              </a>
            </h6>
            <p class="card-text mb-1">
              <a class="text-decoration-none" href="artist.html?artistId=${el.artist.id}" style="font-size: 0.7rem; color: #808080;">
                ${el.artist.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    `;

      myRow.appendChild(newCol);
    }
  });
};

window.addEventListener("resize", checkScreenSize);
checkScreenSize(); // Inizializza al caricamento

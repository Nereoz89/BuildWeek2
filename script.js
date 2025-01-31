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
      newCol.classList.add(
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-2",
        "my-2",
        "p-1",
        "d-flex",
        "justify-content-center"
      );
      newCol.innerHTML = `
    <div class="card h-100 border-0 p-3" id="albumCard" ">
        <img src="${el.album.cover_big}" class="card-img-top img-fluid" alt="img-${index}">
        <div class="card-body d-flex flex-column justify-content-between px-0">
            <div>
            <h6 class="card-title"><a class="text-decoration-none text-white" href="album.html?albumId=${el.album.id}">${el.album.title}</a></h6>
            </div>
            <div>
          <p class="card-text">
            <a class="text-decoration-none" href="artist.html?artistId=${el.artist.id}" style="font-size: 0.7rem; color: #808080;">${el.artist.name}</a>
          </p>

            
            </div>
            
        </div>
    </div>
      `;
      myRow.appendChild(newCol);
    }
  });
};

// Cambio del titolo in un paragrafo su schermi medi
const title = document.getElementById("album-title");
const paragraph = document.getElementById("album-paragraph");

function checkScreenSize() {
  if (window.innerWidth < 992) {
    // A partire da schermi md
    title.classList.add("d-none");
    paragraph.classList.remove("d-none");
  } else {
    title.classList.remove("d-none");
    paragraph.classList.add("d-none");
  }
}

window.addEventListener("resize", checkScreenSize);
checkScreenSize(); // Inizializza al caricamento

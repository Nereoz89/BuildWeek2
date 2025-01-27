// RINTRACCIO LA ROW TARGET
const myRow = document.getElementById("mainRow");

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=ac-dc";
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
    if (index < 15) {
      const newCol = document.createElement("div");
      newCol.classList.add("col", "my-2", "p-1", "d-flex", "justify-content-center");
      newCol.innerHTML = `
    <div class="card h-100 border-0 p-2 bg-dark" style="width: 10rem;">
        <img src="${el.album.cover_big}" class="card-img-top img-fluid" alt="img-${index}">
        <div class="card-body d-flex flex-column justify-content-between px-0">
            <div>
            <h6 class="card-title"><a class="text-decoration-none text-white" href="album.html?albumId=${el.album.id}">${el.album.title}</a></h6>
            </div>
            <div>
            <p class="card-text"> <a class="text-white" href="artist.html?artistId=${el.artist.id}">${el.artist.name}</a></p>
            
            </div>
            
        </div>
    </div>
      `;
      myRow.appendChild(newCol);
    }
  });
};

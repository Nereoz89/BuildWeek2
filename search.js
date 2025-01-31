// Recuperiamo l'elemento del campo di input e il contenitore per i risultati
const searchQueryInput = document.getElementById("searchQuery");
const resultsContainer = document.getElementById("resultsContainer");
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

function searchMusic() {
  const query = searchQueryInput.value.trim();
  if (!query) {
    alert("Inserisci una canzone nella barra di ricerca.");
    return;
  }

  const categoriesSection = document.getElementById("categoriesSection");
  categoriesSection.style.display = "none";

  resultsContainer.innerHTML = "<p>Loading...</p>";

  const url = apiUrl + encodeURIComponent(query);

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Spiacenti, qualcosa è andato storto.</p>";
    });
}

function displayResults(data) {
  const categoriesSection = document.getElementById("categoriesSection");

  if (data.data.length === 0) {
    resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
    categoriesSection.style.display = "block"; // Rende visibili le categorie se non ci sono risultati
    return;
  }

  resultsContainer.innerHTML = ""; // Svuota i risultati

  const rowElement = document.createElement("div");
  rowElement.classList.add("row"); // Contenitore per le card

  data.data.forEach((track) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("col-12", "col-sm-6", "col-md-4");

    trackElement.innerHTML = `
    <div class="card card-custom bg-dark text-white rounded-3 shadow-lg mb-5" id="track-${track.id}" style="margin: 0 auto;">
      <img src="${track.album.cover}" class="card-img-top" alt="${track.title}">
      <div class="card-body">
        <h5 class="card-title">${track.title}</h5>
        <a href="${track.link}" class="btn btn-primary w-100" target="_blank" style="font-weight: bold;">Ascolta</a>
      </div>
    </div>
  `;

    rowElement.appendChild(trackElement);
  });

  resultsContainer.appendChild(rowElement); // Aggiunge la riga con le card
}

searchQueryInput.addEventListener("input", function () {
  const categoriesSection = document.getElementById("categoriesSection");
  if (searchQueryInput.value.trim() === "") {
    categoriesSection.style.display = "block"; // Mostra le categorie se l'input è vuoto
    resultsContainer.innerHTML = ""; // Svuota i risultati
  }
});

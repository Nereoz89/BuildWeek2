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
  if (data.data.length === 0) {
    resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
    return;
  }

  resultsContainer.innerHTML = ""; // Svuota i risultati

  const rowElement = document.createElement("div");
  rowElement.classList.add("row"); // Contenitore per le card

  data.data.forEach((track) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("col-12", "col-md-6", "mb-4"); // 2 per riga su schermi medi e grandi

    trackElement.innerHTML = `
      <div class="card bg-dark text-white h-100">
        <img src="${track.album.cover}" class="card-img-top" alt="${track.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${track.title}</h5>
          <p class="card-text">Artist: ${track.artist.name}</p>
          <a href="${track.link}" class="btn btn-primary mt-auto" target="_blank">Listen</a>
        </div>
      </div>
    `;

    rowElement.appendChild(trackElement);
  });

  resultsContainer.appendChild(rowElement); // Aggiunge la riga con le card
}

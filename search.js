// Recuperiamo l'elemento del campo di input e il contenitore per i risultati
const searchQueryInput = document.getElementById("searchQuery");
const resultsContainer = document.getElementById("resultsContainer");
const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

function searchMusic() {
  const query = searchQueryInput.value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";
  const url = apiUrl + encodeURIComponent(query);

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Sorry, something went wrong.</p>";
    });
}

function displayResults(data) {
  if (data.data.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  resultsContainer.innerHTML = "";

  data.data.forEach((track) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("col-md-6", "mb-4");

    trackElement.innerHTML = `
      <div class="card bg-dark text-white">
        <img src="${track.album.cover}" class="card-img-top" alt="${track.title}">
        <div class="card-body">
          <h5 class="card-title">${track.title}</h5>
          <p class="card-text">Artist: ${track.artist.name}</p>
          <a href="${track.link}" class="btn btn-primary" target="_blank">Listen</a>
        </div>
      </div>
    `;

    resultsContainer.appendChild(trackElement);
  });
}

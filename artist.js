// Recupera l'ID dell'artista dai parametri dell'URL
const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('artistId');

if (!artistId) {
  console.error('Artist ID not found in URL');
} else {
  // Endpoint per i dettagli dell'artista
  const artistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
  // Endpoint per le top tracce dell'artista
  const topTracksUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`;
  // Endpoint per gli album dell'artista
  const albumsUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/albums`;

  // Funzione per fetchare i dati
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Funzione per visualizzare i dettagli dell'artista
  const displayArtistDetails = (artist) => {
    const artistDetails = document.getElementById('artistDetails');
    artistDetails.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${artist.picture_big}" alt="${artist.name}" class="rounded-circle" width="150" height="150">
        <div class="ms-4">
          <h1>${artist.name}</h1>
          <p>Fans: ${artist.nb_fan}</p>
        </div>
      </div>
    `;
  };

  // Funzione per visualizzare le top tracce dell'artista
  const displayTopTracks = (tracks) => {
    const trackList = document.getElementById('trackList');
    trackList.innerHTML = tracks.data
      .map(
        (track, index) => `
      <li class="d-flex justify-content-between align-items-center mb-2">
        <span>${index + 1}. ${track.title}</span>
        <span>${Math.floor(track.duration / 60)}:${track.duration % 60 < 10 ? '0' : ''}${track.duration % 60}</span>
      </li>
    `
      )
      .join('');
  };

  // Funzione per visualizzare gli album dell'artista
  const displayAlbums = (albums) => {
    const albumRow = document.getElementById('albumRow');
    albumRow.innerHTML = albums.data
      .map(
        (album) => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
        <div class="card h-100 border-0 p-3" style="background-color: #161616;">
          <img src="${album.cover_medium}" class="card-img-top img-fluid" alt="${album.title}">
          <div class="card-body d-flex flex-column justify-content-between px-0">
            <h6 class="card-title"><a class="text-decoration-none text-white" href="album.html?albumId=${album.id}">${album.title}</a></h6>
            <p class="card-text" style="font-size: 0.7rem; color: #808080;">${album.release_date}</p>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  };

  // Fetch e visualizzazione dei dati
  const loadArtistData = async () => {
    const artist = await fetchData(artistUrl);
    const topTracks = await fetchData(topTracksUrl);
    const albums = await fetchData(albumsUrl);

    if (artist) displayArtistDetails(artist);
    if (topTracks) displayTopTracks(topTracks);
    if (albums) displayAlbums(albums);
  };

  loadArtistData();
}
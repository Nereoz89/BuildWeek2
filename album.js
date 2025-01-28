const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("id");
console.log(albumId);

const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;
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
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

var searchInputEL = document.querySelector("#search-input");
var inputDescriptionEL = document.querySelector("#search-input-description");
var playerEL = document.querySelector("#player");
var relatedItem1EL = document.querySelector("#related-item-1");
var relatedItem2EL = document.querySelector("#related-item-2");
var relatedItem3EL = document.querySelector("#related-item-3");

var optionGet = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    "X-RapidAPI-Key": "acee90adcamshab5587e0a971503p1fb99djsn843173898727",
  },
};

var tempSongName = "hello";

const getSong = () => {
  const params = new URLSearchParams(window.location.search);
  const songName = params.get("song-name");
  const index = params.get("index");
  songQuery(songName, index);
};

const songQuery = (songName, index) => {
  let songArray = songName.split(" ");
  let songUrl = songArray.join("%20");
  searchSong(songUrl, index);
};

const searchSong = (songUrl, index) => {
  fetch(
    `https://shazam.p.rapidapi.com/search?term=${songUrl}&locale=en-US&offset=0&limit=5`,
    optionGet
  )
    .then((response) => response.json())
    .then((response) => {
      searchInputEL.append(response.tracks.hits[index || 0].track.title);
      inputDescriptionEL.append(
        "The artist/band for this song is: " +
          response.tracks.hits[index || 0].track.subtitle
      );
      playerEL.innerHTML =
        `<a href=" ` +
        response.tracks.hits[index || 0].track.url +
        `" target="_blank">View this track on Shazam!</>`;
      return response.tracks.hits[index || 0].track.key;
    })
    .then((key) => songReccomendation(key))
    .catch((err) => {
      if (err) throw err;
    });
};

const songReccomendation = (songId) => {
  fetch(
    "https://shazam.p.rapidapi.com/songs/list-recommendations?key=" +
      songId +
      "&locale=en-US",
    optionGet
  )
    .then((response) => response.json())
    .then((response) => {
      if (!response.tracks) {
        relatedItem1EL.append("No recommendations found");
        relatedItem2EL.append("No recommendations found");
        relatedItem3EL.append("No recommendations found");
      } else {
        relatedItem1EL.innerHTML =
          "Similar Song: " +
          '<a href="' +
          response.tracks[0].url +
          '" target="_blank">' +
          response.tracks[0].title +
          " by " +
          response.tracks[0].subtitle +
          "</a>";
        relatedItem2EL.innerHTML =
          "Similar Song: " +
          '<a href="' +
          response.tracks[1].url +
          '" target="_blank">' +
          response.tracks[1].title +
          " by " +
          response.tracks[1].subtitle +
          "</a>";
        relatedItem3EL.innerHTML =
          "Similar Song: " +
          '<a href="' +
          response.tracks[2].url +
          '" target="_blank">' +
          response.tracks[2].title +
          " by " +
          response.tracks[2].subtitle +
          "</a>";
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
};

function newSong() {
  let tempArray = this.textContent.split(":");
  let songName = tempArray[1].trim();

  console.log(songName);

  searchInputEL.innerHTML = "";
  inputDescriptionEL.innerHTML = "";
  playerEL.innerHTML = "";
  relatedItem1EL.innerHTML = "";
  relatedItem2EL.innerHTML = "";
  relatedItem3EL.innerHTML = "";

  searchSong(songName);
}

relatedItem1EL.addEventListener("click", newSong);
relatedItem2EL.addEventListener("click", newSong);
relatedItem3EL.addEventListener("click", newSong);

getSong();

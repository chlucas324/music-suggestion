var songNameEl = document.querySelector('#song-name');
var searchButtonEl = document.querySelector('#search-button');
var searchDataEl = document.querySelector('#search-data')

var optionGet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
		'X-RapidAPI-Key': 'acee90adcamshab5587e0a971503p1fb99djsn843173898727',
	}
};

const songQuery = (event) => {
  event.preventDefault()
  let songName = songNameEl.value.trim()
  let songArray = songName.split(' ');
  let songUri = songArray.join('%20')
  searchSong(songUri)
}

const searchSong = (songName) => {
  fetch(`https://shazam.p.rapidapi.com/search?term=${songName}&locale=en-US&offset=0&limit=5`, optionGet)
    .then(response => response.json())
    .then(response => { 
    var artistArray = []
    console.log(response);
    for (let i = 0; i < response.tracks.hits.length; i++) {
      if(i>4){
        break;
      }
      artistArray.push(response.tracks.hits[i].track.subtitle);
    }
    return artistArray;
    })
    .then(artists => generateArtists(artists))
    .catch(err => {
      if(err)throw(err)
    })
};

const generateArtists = (artists) => {
  var artistList = [];
  
  for (let i = 0; i < artists.length; i++) {    
    let artist = artists[i]
    let artistHTML = '<li><a href="/search-results?song-name=' + songNameEl.value.trim() + '&index=' + i + '" id="artist-link-' + i + '">Artist: ' + artist + ' </a></li>'

    artistList.push(artistHTML);
  }

  artistList.join();
  return searchDataEl.innerHTML = artistList;
}

searchButtonEl.addEventListener('click', songQuery)
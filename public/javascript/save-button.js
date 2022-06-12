var saveButtonEl = document.querySelector('#save');

const saveSong = (event) => {
  event.preventDefault();

  const song_name = document.querySelector('#search-input').textContent;
  const artist_name = document.querySelector('#search-input-description').textContent.split(':')[1].trim();
  const search_url = window.location.search.split('?')[1];

  fetch(`/api/songs`, {
    method: 'POST',
    body: JSON.stringify({
      song_name,
      artist_name,
      search_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
    document.location.replace('/playlist');
  } else {
    alert(response.statusText);
  }
  }) 
}

saveButtonEl.addEventListener('click', saveSong);
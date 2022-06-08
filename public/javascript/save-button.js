var saveButtonEl = document.querySelector('#save');

const saveSong = async(event) => {
  event.preventDefault();

  const song_name = document.querySelector('#search-input').value;
  const artist_name = document.querySelector('#search-input-description').value;
  const search_url = window.location.search.split('?')[1];

  const response = await fetch(`/api/songs`, {
    method: 'POST',
    body: JSON.stringify({
      song_name,
      artist_name,
      search_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/playlist');
  } else {
    alert(response.statusText);
  }
}

saveButtonEl.addEventListener('click', saveSong);
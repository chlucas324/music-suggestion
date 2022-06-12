var saveButtonEl = document.querySelector("#save");

<<<<<<< Updated upstream
const saveSong = (event) => {
=======
const saveSong = async (event) => {
>>>>>>> Stashed changes
  event.preventDefault();

  const song_name = document.querySelector("#search-input").textContent;
  const artist_name = document
    .querySelector("#search-input-description")
    .textContent.split(":")[1]
    .trim();
  const search_url = window.location.search.split("?")[1];

<<<<<<< Updated upstream
  fetch(`/api/songs`, {
=======
  const response = await fetch(`/api/songs`, {
>>>>>>> Stashed changes
    method: "POST",
    body: JSON.stringify({
      song_name,
      artist_name,
      search_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
<<<<<<< Updated upstream
  }).then((response) => {
    if (response.ok) {
      document.location.replace("/playlist");
    } else {
      alert(response.statusText);
    }
=======
>>>>>>> Stashed changes
  });
};

<<<<<<< Updated upstream
=======
  if (response.ok) {
    document.location.replace("/playlist");
  } else {
    alert(response.statusText);
  }
};

>>>>>>> Stashed changes
saveButtonEl.addEventListener("click", saveSong);

const result = document.getElementById("result");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

const showData = (data) => {
    result.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            song => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
          )
          .join('')}
      </ul>
    `;
}

async function searchSongs(event) {
    try {
        event.preventDefault();
        const response = await (await fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)).json();
        showData(response);
    } catch (error) {
        console.log("Failed to retrieve search results", error);
    }
}

searchBtn.addEventListener("click", searchSongs);;

async function getLyrics(artist, songTitle) {
    try {
        const response = await (await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)).json();
        result.innerHTML = `<h1>${artist} - ${songTitle}</h1><br><pre>${response.lyrics}</pre>`
    } catch (error) {
        console.log("Failed to retrieve lyrics", error);
    }
}

result.addEventListener("click", (event) => {
    const artist =  event.target.getAttribute("data-artist");
    const song =  event.target.getAttribute("data-songtitle");
    getLyrics(artist, song);
})


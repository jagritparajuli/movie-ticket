const content = document.getElementById('movies');

async function getMovies() {
  const res = await axios.get('http://localhost:3000/movies');
  const movies = res.data;
  let code = '';
  movies.map((movie) => {
    code += `
    <div class="card" onclick = "goToMovie('${movie.imdbID}')">
      <img src = "${movie.image_url}" alt="${movie.title}">
    </div>
    `;
  });
  content.innerHTML = code;
}

function goToMovie(id) {
  window.location = '/movie_detail.html?id=' + id;
}

getMovies();

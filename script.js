const content = document.getElementById('movies');

async function getMovies() {
  const res = await axios.get('http://localhost:3000/movies');
  const movies = res.data;
  let code = '';
  movies.map((movie) => {
    code += `
    <div class="card" onclick = "goToMovie('${movie.imdbID}','${movie.price}')">
      <img src = "${movie.image_url}" alt="${movie.title}">
    </div>
    `;
  });
  content.innerHTML = code;
}

function goToMovie(id, price) {
  window.location = `/movie_detail.html?id=${id}&${price}`;
}

getMovies();

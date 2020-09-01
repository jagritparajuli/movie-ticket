function getId() {
  return window.location.href.slice(
    window.location.href.indexOf('=') + 1,
    window.location.href.length
  );
}

async function getMovieDetail() {
  const res = await axios.get(
    `http://www.omdbapi.com/?apikey=8a48da82&i=${getId()}`
  );
  const movie = res.data;
  console.log(movie);
}

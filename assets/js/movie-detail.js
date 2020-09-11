const title = document.getElementById('title');
const rated = document.getElementById('rated');
const listContianer = document.getElementById('extra');
const poster = document.getElementById('poster');
const plotEl = document.getElementById('plot');
const priceEL = document.getElementById('price');

const book_button = document.getElementById('book-tickets');

let id;
let price;

function getId() {
  const data = window.location.href
    .slice(window.location.href.indexOf('=') + 1, window.location.href.length)
    .split('&');
  id = data[0];
  price = data[1];
}

getId();

async function getMovieDetail() {
  const res = await axios.get(
    `http://www.omdbapi.com/?apikey=8a48da82&i=${id}&plot=full`
  );
  const movie = res.data;
  title.innerText = movie.Title;
  rated.innerText = movie.Rated;
  poster.src = movie.Poster;
  poster.alt = movie.title;
  plotEl.innerText = movie.Plot;
  listContianer.innerHTML = `
    <li><strong>Actors: </strong>${movie.Actors}</li>
    <li><strong>Director: </strong>${movie.Director}</li>
    <li><strong>Writer: </strong>${movie.Writer}</li>
    <li><strong>Genre: </strong>${movie.Genre}</li>
    <li><strong>Language: </strong>${movie.Language}</li>
    <li><strong>Country: </strong>${movie.Country}</li>
    <li><strong>Year: </strong>${movie.Year}</li>
    <li><strong>Runtime: </strong>${movie.Runtime}</li>
    <li><strong>imdbRating: </strong>${movie.imdbRating}</li>
  `;
}

function gotoBooking() {
  sessionStorage.setItem('movie_id', id);
  sessionStorage.setItem('movie', title.innerText);
  sessionStorage.setItem('price', price);
  window.location = 'booking.html';
}

getMovieDetail();

book_button.addEventListener('click', gotoBooking);

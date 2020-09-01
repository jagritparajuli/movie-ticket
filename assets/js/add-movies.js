const add_form = document.getElementById('add-form');
const title = document.getElementById('title');
const genre = document.getElementById('genre');
const year = document.getElementById('year');
const imdbID = document.getElementById('imdbID');
const price = document.getElementById('price');

function generateId(n) {
  const chars = 'asdfghjklqwertyuiopzxcvbnm1234567890';
  let id = '';
  for (let i = 0; i < n; i++) {
    id += chars[Math.floor(Math.random() * 36)];
  }
  return id;
}

async function sendPostRequest() {
  const params = {
    id: generateId(10),
    title: title.value,
    genre: genre.value,
    year: year.value,
    imdbID: imdbID.value,
    price: price.value,
  };
  let res = await axios.post('http://localhost:3000/movies', params);
  console.log(res);
}

// Event listener for form submission
add_form.addEventListener('submit', (e) => {
  sendPostRequest();
  e.preventDefault();
});

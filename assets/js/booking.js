const user_id = sessionStorage.getItem('user_id');
const movie_id = sessionStorage.getItem('movie_id');
const movie = sessionStorage.getItem('movie');
const price = sessionStorage.getItem('price');

const total = document.getElementById('total');
const count = document.getElementById('count');

const container = document.querySelector('.container-booking');
const movie_title = document.getElementById('movie_name');
const seats = document.querySelectorAll('.container-booking .seat');
const confirm = document.getElementById('confirm');

let selectedSeatsCount;

if (movie_id && movie && price) {
  if (!user_id) {
    window.location = 'signin.html';
  }
} else {
  window.location = 'index.html';
}

movie_title.innerText = movie;

seats.forEach(checkBooked);

async function checkBooked(seat, index) {
  const res = await axios.get('http://localhost:3000/booked_tickets');
  const occupied = res.data;
  if (occupied.booked.includes(index)) {
    seat.classList.add('occupied');
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  selectedSeatsCount = selectedSeats.length;

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * price;
}

function bookTickets() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const bookedSeats = document.querySelectorAll('.row .seat.occupied');
  const selected = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const occupieds = [...bookedSeats].map((seat) => [...seats].indexOf(seat));
  const totalSeats = [...occupieds, ...selected];

  const params = {
    tickets: {
      movie: movie,
      movie_id: movie_id,
      seats: selected,
      price: selectedSeatsCount * price,
    },
  };
  params2 = {
    booked: totalSeats,
  };
  async function setUser() {
    const res = await axios.patch(
      `http://localhost:3000/users/${user_id}`,
      params
    );
  }
  async function setBooked() {
    const res2 = await axios.patch(
      'http://localhost:3000/booked_tickets',
      params2
    );
  }

  setUser();
  setBooked();

  window.location = 'user.html';
}

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

confirm.addEventListener('click', bookTickets);

const username = document.getElementById('username');
const info = document.getElementById('info');
const tickets = document.getElementById('tickets');
const avatar = document.getElementById('avatar');

const user_id = sessionStorage.getItem('user_id');

if (!user_id) {
  window.location = 'signin.html';
}

async function populateUI() {
  const res = await axios.get(`http://localhost:3000/users/${user_id}`);
  const user = res.data;
  username.innerText = user.name;
  const lists = `
    <li><strong>Name: </strong>${user.name}</li>
    <li><strong>Email: </strong>${user.email}</li>
    <li><strong>Active: </strong>Yes <i class="fas fa-circle active"></i></li>
    <li><strong>Tickets:</strong>${user.tickets.seats.length}</li>
  `;
  info.innerHTML = lists;

  const tickets_info = `
    <li>
      <span>${user.tickets.movie}</span>
      <span>${user.tickets.seats.length} x seats</span>
      <span>Rs.${user.tickets.price}</span>
    </li>
  `;
  tickets.innerHTML = tickets_info;

  avatar.src = `https://api.adorable.io/avatars/${Math.floor(
    Math.random() * 100
  )}`;
}

populateUI();

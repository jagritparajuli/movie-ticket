const sigin = document.getElementById('signinLink');
const links = document.querySelector('.links');
if (sessionStorage.getItem('user_id')) {
  sigin.innerText = 'Sign Out';
  sigin.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
  });
  const user_link = document.createElement('a');
  user_link.href = 'user.html';
  user_link.innerHTML = `<img style = "width:40px;border-radius:50%" src =" https://api.adorable.io/avatars/${Math.floor(
    Math.random() * 100
  )}" alt = "Profile">`;
  links.appendChild(user_link);
} else {
  sigin.innerText = 'Sign in';
  sigin.href = 'signin.html';
}

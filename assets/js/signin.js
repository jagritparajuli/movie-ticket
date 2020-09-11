const sigin_form = document.getElementById('signin');
const email_in = document.getElementById('signin_email');
const password_in = document.getElementById('signin_password');

const signup_form = document.getElementById('signup');
const name = document.getElementById('name');
const email_up = document.getElementById('signup_email');
const password_up = document.getElementById('signup_password');
const password_up2 = document.getElementById('signup_password2');

const error_el = document.getElementById('error');

// Validating email
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value.trim().toLowerCase())) {
    showError('Email must be valid');
    return false;
  } else {
    return email.value.trim().toLowerCase();
  }
}

// Validation for sign in
async function signinValidation() {
  const email = checkEmail(email_in);
  const password = password_in.value;

  if (email) {
    const res = await axios.get(`http://localhost:3000/users?email=${email}`);
    const user = res.data[0];
    if (!user) {
      showError('Email not found');
    }
    if (user.email === email && user.password === password) {
      sessionStorage.setItem('user_id', user.id);
      if (document.URL === document.referrer || document.referrer === '') {
        window.location = 'user.html';
      } else {
        window.location = document.referrer;
      }
    } else {
      showError('Incorrect Password');
    }
  }
}

// Validation for sign up
async function signupValidation() {
  const email = checkEmail(email_up);
  const password = password_up.value;
  const password2 = password_up2.value;

  if (name.value) {
    if (email) {
      if (password !== '') {
        if (password.length >= 6 && password.length < 32) {
          if (password === password2) {
            const params = {
              id: generateID(6),
              name: name.value,
              email: email,
              password: password2,
              tickets: [],
            };
            let res = await axios.post('http://localhost:3000/users/', params);
            await sessionStorage.setItem('signup', 'complete');
          } else {
            showError('Passwords didnot match');
          }
        } else {
          showError('Password must have 6-32 characters');
        }
      } else {
        showError('Password cannot be empty');
      }
    } else {
      showError('Email must be valid');
    }
  } else {
    showError('Name is required');
  }
}

// Function to show error
function showError(msg) {
  error_el.textContent = msg;
  const alert = error_el.parentElement;
  alert.style.display = 'block';
  setTimeout(() => {
    alert.style.display = 'none';
  }, 3000);
}

// Function to generate id
function generateID(len) {
  const chars =
    'asdfghjklzxcvbnmqwertyuiop1234567890ASDFGHJKLQWERTYUIOPZXCVBNM';
  let id = '';
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * 62)];
  }
  return id;
}

// Sign in event listener
sigin_form.addEventListener('submit', (e) => {
  e.preventDefault();
  signinValidation();
});

// Sign up event Listener
signup_form.addEventListener('submit', (e) => {
  e.preventDefault();
  signupValidation();
});

if (sessionStorage.getItem('signup')) {
  showModal();
  sessionStorage.removeItem('signup');
}

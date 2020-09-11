const closer = document.getElementById('close-modal');
const modal = document.getElementById('modal');

closer.addEventListener('click', hideModal);

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

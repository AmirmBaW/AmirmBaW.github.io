const header = document.querySelector('.js-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('round');
  } else {
    header.classList.remove('round');
  }
});
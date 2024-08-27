function toggleText() {
  // ваш код...
  let btn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');
  let i = 0;
  btn.addEventListener('click', () => {
    if (i == 0) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
    i++;
  });
}

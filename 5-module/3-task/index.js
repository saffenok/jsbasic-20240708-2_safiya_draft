function initCarousel() {
  // ваш код...
  let carouselContainer = document.querySelector('.carousel');
  let carouselInner = carouselContainer.querySelector('.carousel__inner');
  let carouselSlides = carouselInner.querySelectorAll('.carousel__slide');
  let carouselArrowLeft = carouselContainer.querySelector('.carousel__arrow.carousel__arrow_left');
  let carouselArrowRight = carouselContainer.querySelector('.carousel__arrow.carousel__arrow_right');
  let carouselWidth = carouselInner.offsetWidth; // 988

  let clickCounter = 0;

  // скрыть стрелку для первого слайда
  if (clickCounter == 0) {
    carouselArrowLeft.style.display = 'none';
  }

  carouselContainer.addEventListener('click', event => {
    // проверка
    let carouselArrow = event.target.closest('.carousel__arrow');
    if (!carouselArrow) return;

    // для правой стрелки
    if (event.target.closest('.carousel__arrow.carousel__arrow_right')) {
      clickCounter++;
      carouselInner.style.transform = `translateX(${-carouselWidth * clickCounter + "px"})`;
    }

    // для левой стрелки
    if (event.target.closest('.carousel__arrow.carousel__arrow_left')) {
      clickCounter--;
      carouselInner.style.transform = `translateX(${-carouselWidth * clickCounter + "px"})`;
    }

    // скрыть стрелки для крайних слайдов
    if (clickCounter == 0) {
      carouselArrowLeft.style.display = 'none';
    } else if (clickCounter == (carouselSlides.length - 1)) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
  });
}

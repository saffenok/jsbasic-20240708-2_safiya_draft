import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.wrapper = null;
    this.currentValue = -1;
    this.currentActiveValue = value;
    this.isDragging = false;

    this.render();
    this.initEventListeners();
  }

  render() {
    this.wrapper = createElement(`
      <div class="slider">

        <div class="slider__thumb" style="left: ${this.value / (this.steps - 1) * 100}%;">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress" style="width: ${this.value / (this.steps - 1) * 100}%;"></div>

        <div class="slider__steps">
        </div>
      </div>
    `);
    this.renderSteps();
  }

  renderSteps() {
    let sliderSteps = this.wrapper.querySelector('.slider__steps');
    let sliderSpan;
    for (let i = 0; i < this.steps; i++) {
      if (i == this.value) {
        sliderSpan = createElement(`<span data-id=${i} class="slider__step-active"></span>`);
      } else {
        sliderSpan = createElement(`<span data-id=${i}></span>`);
      }
      sliderSteps.append(sliderSpan);
    }
  }

  initEventListeners() {
    this.wrapper.addEventListener('click', this.onClick);

    this.thumb = this.wrapper.querySelector('.slider__thumb');
    this.thumb.addEventListener('pointerdown', event => {
      this.onPointerDown(event);
    });
    this.thumb.ondragstart = () => false;
  }

  onClick = event => {
    if (this.isDragging) {
      this.isDragging = false;
      return;
    }

    this.selectedValue = this.valueCalculation(event.clientX);
    this.changeValue(this.selectedValue);
    this.finalRepositioning(this.selectedValue);

    this.createNewCustomEvent(this.selectedValue);
  }

  onPointerDown(event) {
    event.preventDefault();
    this.isDragging = true;

    this.wrapper.classList.add('slider_dragging');

    this.sliderLeft = this.wrapper.getBoundingClientRect().left;
    this.sliderRight = this.wrapper.getBoundingClientRect().right;
    this.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;

    this.moveAt(event.clientX);

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  moveAt = clientX => {
    this.thumb.style.left = clientX - this.shiftX - this.sliderLeft + (this.thumb.offsetWidth / 2) + 'px';

    this.selectedValue = this.valueCalculation(clientX);
    this.changeValue(this.selectedValue);
    this.changeProgressDnD();
  }

  onPointerMove = (event) => {
    event.preventDefault();

    let eventClientX = event.clientX;
    if (eventClientX < this.sliderLeft) {
      eventClientX = this.sliderLeft;
    }
    if (eventClientX > (this.sliderRight - (this.thumb.offsetWidth / 2))) {
      eventClientX = this.sliderRight;
    }

    this.moveAt(eventClientX);
  }

  onPointerUp = () => {
    this.createNewCustomEvent(this.selectedValue);

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.wrapper.classList.remove('slider_dragging');
  }

  valueCalculation(eventClientX) {
    let leftSlider = this.wrapper.getBoundingClientRect().left;
    let sliderWidth = this.wrapper.offsetWidth;
    let segmentWidth = this.wrapper.offsetWidth / (this.steps - 1);
    let clickX = eventClientX - leftSlider;
    let counter = 0;
    let selectedValue = 0;
    for (let i = 0; i <= sliderWidth; i += segmentWidth) {
      if (clickX >= i && clickX <= (i + segmentWidth)) {
        if ((clickX - (counter * segmentWidth)) >= (segmentWidth / 2)) {
          selectedValue = counter + 1;
        } else {
          selectedValue = counter;
        }
        break;
      }
      counter++;
    }

    return selectedValue;
  }

  changeValue(currentValue) {
    let sliderValue = this.wrapper.querySelector('.slider__value');
    sliderValue.innerHTML = currentValue;

    let sliderSteps = this.wrapper.querySelector('.slider__steps');
    let currentActiveSpan = sliderSteps.children[`${this.currentActiveValue}`];
    currentActiveSpan.classList.remove('slider__step-active');
    this.currentActiveValue = currentValue;
    let currentSpan = sliderSteps.children[`${currentValue}`];
    currentSpan.classList.add('slider__step-active');
  }

  changeProgressDnD() {
    let progress = this.wrapper.querySelector('.slider__progress');
    let thumbLeft = parseFloat(this.thumb.style.left);
    progress.style.width = `${thumbLeft / this.wrapper.offsetWidth * 100}%`;
  }

  finalRepositioning(currentValue) {
    let thumb = this.wrapper.querySelector('.slider__thumb');
    let progress = this.wrapper.querySelector('.slider__progress');

    thumb.style.left = `${currentValue / (this.steps - 1) * 100}%`;
    progress.style.width = `${currentValue / (this.steps - 1) * 100}%`;
  }

  createNewCustomEvent(currentValue) {
    this.wrapper.dispatchEvent(new CustomEvent('slider-change', {
      detail: currentValue,
      bubbles: true,
    }));
  }

  get elem() {
    return this.wrapper;
  }
}

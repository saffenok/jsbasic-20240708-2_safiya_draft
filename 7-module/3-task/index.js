import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.wrapper = null;
    this.currentValue = -1;
    this.currentActiveValue = value;

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
    this.wrapper.addEventListener('click', event => {
      this.selectedValue = this.valueCalculation(event);
      this.changeValue(this.selectedValue);
    });
  }

  valueCalculation(event) {
    let leftSlider = this.wrapper.getBoundingClientRect().left;
    let sliderWidth = this.wrapper.offsetWidth; //330
    let segmentWidth = this.wrapper.offsetWidth / (this.steps - 1); //82.5
    let clickX = event.pageX - leftSlider;
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

    let thumb = this.wrapper.querySelector('.slider__thumb');
    let progress = this.wrapper.querySelector('.slider__progress');
    thumb.style.left = `${currentValue / (this.steps - 1) * 100}%`;
    progress.style.width = `${currentValue / (this.steps - 1) * 100}%`;

    this.wrapper.dispatchEvent(new CustomEvent('slider-change', {
      detail: currentValue,
      bubbles: true,
    }));
  }

  get elem() {
    return this.wrapper;
  }
}

import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    let carousel = new Carousel(slides);
    let dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    dataCarouselHolder.append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    dataRibbonHolder.append(ribbonMenu.elem);

    let stepSlider = new StepSlider({
      steps: 6,
      value: 3
    });
    let datSliderHolder = document.querySelector('[data-slider-holder]');
    datSliderHolder.append(stepSlider.elem);

    let cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    dataCartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let products = await response.json();
    let productsGrid = new ProductsGrid(products);
    let dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');
    dataProductsGridHolder.innerHTML = '';
    dataProductsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    let body = document.body;
    body.addEventListener('product-add', event => {
      let productId = event.detail;
      let product = products.find(product => product.id == productId);
      cart.addProduct(product);
    });

    body.addEventListener('slider-change', event => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    body.addEventListener('ribbon-select', event => {
      productsGrid.updateFilter({
        category: event.detail
      });
    });


    let noNutsControl = document.querySelector('#nuts-checkbox');
    noNutsControl.addEventListener('change', event => {
      productsGrid.updateFilter({ 
        noNuts: event.target.checked 
      });
    });

    let vegetarianOnlyControl = document.querySelector('#vegeterian-checkbox');
    vegetarianOnlyControl.addEventListener('change', event => {
      productsGrid.updateFilter({ 
        vegeterianOnly: event.target.checked 
      });
    });

  }
}

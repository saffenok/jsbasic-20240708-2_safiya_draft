export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (!product) return;

    let cartItem;
    let hasProduct = 0;
    for (let item of this.cartItems) {
      hasProduct++;
      // если этот товар уже есть
      if (item.product.id == product.id) {
        hasProduct = -1;
        item.count++;
        cartItem = item;
        break;
      }
    }
    // если этого товара нет, но есть другие, или корзина пустая
    if ((hasProduct != -1)) {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let cartItem;
    for (let i = 0; i < this.cartItems.length; i++) {
      let item = this.cartItems[i];
      if (item.product.id == productId) {
        item.count += amount;
        if (!item.count) {
          this.cartItems.splice(i, 1);
        }
        cartItem = item;
        break;
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    if (this.cartItems.length) return false;
    else return true;
  }

  getTotalCount() {
    // ваш код
    let count = 0;
    for (let item of this.cartItems) {
      count += item.count;
    }
    return count;
  }

  getTotalPrice() {
    // ваш код
    let price = 0;
    for (let item of this.cartItems) {
      price += item.product.price * item.count;
    }
    return price;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


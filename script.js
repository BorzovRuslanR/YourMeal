

fetch('/db.json')
.then((response) => {
  if (response.ok) return response.json()
  throw new Error(response.statusText || response.status)
})
.then((data) => {
  const navigationButtons = document.querySelectorAll('.navigation__button');
  const catalog = document.querySelector('.catalog__list');
  const modals = document.querySelectorAll('.modal');
  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('.modal-product__title');
  const modalImage = document.querySelector('.modal-product__image');
  const modalProductDescription = document.querySelector('.modal-product__description');
  const ingredientsList = document.querySelector('.ingredients');
  const closeButton = document.querySelector('.modal__close');
  const skipButton = document.querySelector('.order__close');
  const orderSubmitButton = document.querySelector('.order__sumbit');
  // const modalDeliveryClose = document.querySelector('.modal__close');

  let totalAmount = 0;
  let totalCount = 0;
  let totalAmountModal = 0;

  

  skipButton.addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
  });

  document.querySelector('.order__wrap-title').addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
  });

  // catalog.addEventListener('click', (event) => {
  //   if (event.target.classList.contains('product__add')) {
  //     const product = event.target.closest('.product');
  //     if (product?.dataset?.id) {
  //       const productData = data.find(p => p.id === product?.dataset?.id);
  //       const title = productData.title;
  //       const weight = productData.weight;
  //       const price = productData.price;
  
  //       totalAmount += productData.price;
  //       totalCount++;
  //       updateOrderSummary();
  
  //       const item = createOrderItem(productData.image, title, weight, price, 1);
  //       orderList.appendChild(item);
  //     }
  //   }
  // });


  const addedImages = [];

catalog.addEventListener('click', (event) => {
  if (event.target.classList.contains('product__add')) {
    const product = event.target.closest('.product');
    if (product) {
      const productData = data.find(p => p.id === product.dataset.id);
      const title = productData.title;
      const weight = productData.weight;
      const price = productData.price;

      const productImage = productData.image;

      // Проверяем, содержится ли уже такая ссылка на картинку в массиве addedImages
      if (addedImages.includes(productImage)) {
        // Если товар уже есть в корзине, просто выходим из функции
        return;
      }

      totalAmount += productData.price;
      totalCount++;
      updateOrderSummary();

      const item = createOrderItem(productImage, title, weight, price, 1);
      orderList.appendChild(item);

      // Добавляем ссылку на картинку товара в массив addedImages
      addedImages.push(productImage);
      console.log(addedImages);
    }
  }
});

// 1 функционал добавления товара в корзину с помощью модального окна
const modalProductBtn = document.querySelector('.modal-product .modal-product__btn');

modalProductBtn.addEventListener('click', (event) => {
  const product = event.target.closest('.modal-product');
  if (product) {
    const productData = getProductDataFromModal(product);
    const title = productData.title;
    const weight = productData.weight;
    const price = productData.price;

    const productImage = productData.image;

    // Проверяем, содержится ли уже такая ссылка на картинку в массиве addedImages
    if (addedImages.includes(productImage)) {
      // Если товар уже есть в корзине, просто выходим из функции
      return;
    }

    totalAmount += productData.price;
    totalCount++;
    updateOrderSummary();

    const item = createOrderItem(productImage, title, weight, price, 1);
    orderList.appendChild(item);

    // Добавляем ссылку на картинку товара в массив addedImages
    addedImages.push(productImage);
    console.log(addedImages);
  }
});

function getProductDataFromModal(product) {
  const titleElement = product.querySelector('.modal-product__title');
  const weightElement = product.querySelector('.ingredients__calories');
  const priceElement = product.querySelector('.modal-product__price');
  const imageElement = product.querySelector('.modal-product__image');

  const title = titleElement ? titleElement.textContent : '';
  const weight = weightElement ? weightElement.textContent : '';
  const price = priceElement ? parseFloat(priceElement.textContent) : 0;
  const image = imageElement ? imageElement.getAttribute('src') : '';

  return { title, weight, price, image };
}


  
  // function handleModalCountMinus(event) {
  //   const amountElement = event.target.nextElementSibling;
  //   let amount = parseInt(amountElement.textContent);
  //   if (amount > 0) {
  //     amount--;
  //     amountElement.textContent = amount;
  //     const priceElementModal = event.target.closest('.order__item').querySelector('.modal-product__price');
  //     const priceModal = parseInt(priceElementModal.textContent);
  //     totalAmountModal -= priceModal;
  //     updateOrderSummary();
  //   }
  // }
  
  // function handleModalCountPlus(event) {
  //   const amountElement = event.target.previousElementSibling;
  //   let amount = parseInt(amountElement.textContent);
  //   if (amount < 20) {
  //     amount++;
  //     amountElement.textContent = amount;
  //     const priceElementModal = event.target.closest('.order__item').querySelector('.modal-product__price');
  //     const priceModal = parseInt(priceElementModal.textContent);
  //     totalAmountModal += priceModal;
  //     updateOrderSummary();
  //   }
  // }
  
  // const modalCountMinusBtn = document.querySelector('.modal-product__count .count__minus');
  // const modalCountPlusBtn = document.querySelector('.modal-product__count .count__plus');
  
  // modalCountMinusBtn.addEventListener('click', handleModalCountMinus);
  // modalCountPlusBtn.addEventListener('click', handleModalCountPlus);
  // 2
  function updateOrderSummary() {
    const totalAmountElement = document.querySelector('.order__total-amount');
    const totalCountElement = document.querySelector('.order__count');
    totalAmountElement.textContent = totalAmount;
    totalCountElement.textContent = totalCount;
  }

  function handleCountMinus(event) {
    const amountElement = event.target.nextElementSibling;
    let amount = parseInt(amountElement.textContent);
    if (amount > 0) {
      amount--;
      amountElement.textContent = amount;
      const priceElement = event.target.closest('.order__item').querySelector('.order__product-price');
      const price = parseInt(priceElement.textContent);
      totalAmount -= price;
      totalCount--;
  
      if (amount === 0) {
        const item = event.target.closest('.order__item');
        item.remove();
  
        const imageElement = item.querySelector('.order__image');
        const productImage = imageElement.getAttribute('src');
  
        // Удаляем ссылку на картинку из массива addedImages
        const imageIndex = addedImages.findIndex(image => image === productImage);
        console.log(addedImages);
        console.log(productImage);
        if (imageIndex !== -1) {
          addedImages.splice(imageIndex, 1);
        }
        console.log(addedImages);
      }
  
      updateOrderSummary();
    }
  }
  
  // function handleCountMinus(event) {
  //   const amountElement = event.target.nextElementSibling;
  //   let amount = parseInt(amountElement.textContent);
  //   if (amount > 0) {
  //     amount--;
  //     amountElement.textContent = amount;
  //     const priceElement = event.target.closest('.order__item').querySelector('.order__product-price');
  //     const price = parseInt(priceElement.textContent);
  //     totalAmount -= price;
  //     totalCount--;
  //     if (amount === 0) {
  //       const item = event.target.closest('.order__item');
  //       item.remove();
  //     }
  //     updateOrderSummary();
  //   }
  // }
  
  function handleCountPlus(event) {
    const amountElement = event.target.previousElementSibling;
    let amount = parseInt(amountElement.textContent);
    if (amount < 20) {
      amount++;
      amountElement.textContent = amount;
      const priceElement = event.target.closest('.order__item').querySelector('.order__product-price');
      const price = parseInt(priceElement.textContent);
      totalAmount += price;
      totalCount++;
      updateOrderSummary();
    }
  }
  
  const orderList = document.querySelector('.order__list');
  
  orderList.addEventListener('click', (event) => {
    if (event.target.classList.contains('count__minus')) {
      handleCountMinus(event);
    } else if (event.target.classList.contains('count__plus')) {
      handleCountPlus(event);
    }
  });

  // modalDeliveryClose.addEventListener('click', () => {
  //   document.querySelector('.modal_delivery').classList.remove('modal_open')
  // });


  // orderSubmitButton.addEventListener('click', () => {
  //   document.querySelector('.modal_delivery').classList.toggle('modal_open')
  // })

const modalDelivery = document.querySelector('.modal_delivery');
const modalProduct = document.querySelector('.modal_product');
const deliveryCloseButton = modalDelivery.querySelector('.modal__close');
const productCloseButton = modalProduct.querySelector('.modal__close');

// orderSubmitButton.addEventListener('click', () => {
//   modalDelivery.classList.toggle('modal_open');
//   document.querySelector('.order').classList.toggle('order_open')
// });

orderSubmitButton.addEventListener('click', () => {
  if (totalCount === 0) {
    return; // Если корзина пуста, просто выходим из функции
  }

  modalDelivery.classList.toggle('modal_open');
  document.querySelector('.order').classList.toggle('order_open');
});

document.addEventListener('click', (event) => {
  const closeButtonClicked = event.target.closest('.modal__close');
  if (closeButtonClicked === deliveryCloseButton) {
    console.log('close delivery');
    modalDelivery.classList.remove('modal_open');
  } else if (closeButtonClicked === productCloseButton) {
    console.log('close product');
    modalProduct.classList.remove('modal_open');
  }
});

  
  function createOrderItem(imageSrc, title, weight, price, amount) {
    const item = document.createElement('li');
    item.classList.add('order__item');
  
    item.innerHTML = `
      <img class="order__image" src="${imageSrc}" alt="">
      <div class="order__product">
        <h3 class="order__product-title">${title}</h3>
        <p class="order__product-weight">${weight}</p>
        <p class="order__product-price">${price}<span class="currency">₽</span></p>
      </div>
      <div class="order__product-count count">
        <button class="count__minus">-</button>
        <p class="count__amount">${amount}</p>
        <button class="count__plus">+</button>
      </div>
    `;
  
    return item;
  }
  

  function showProducts(category) {
    catalog.innerHTML = '';

    const filteredProducts = data.filter(item => item.category === category);

    filteredProducts.forEach(product => {
      const li = document.createElement('li');
      li.classList.add('catalog__item');

      const article = document.createElement('article');
      article.classList.add('product');
      article.dataset.id = product.id

      const img = document.createElement('img');
      img.classList.add('product__image');
      img.src = product.image;
      img.alt = product.title;
      article.appendChild(img);

      const price = document.createElement('p');
      price.classList.add('product__price');
      price.textContent = product.price;
      const currency = document.createElement('span');
      currency.classList.add('currency');
      currency.textContent = '₽';
      price.appendChild(currency);
      article.appendChild(price);

      const title = document.createElement('h3');
      title.classList.add('product__title');
      const detailButton = document.createElement('button');
      detailButton.classList.add('product__detail');
      detailButton.textContent = product.title;
      title.appendChild(detailButton);
      article.appendChild(title);

      const weight = document.createElement('p');
      weight.classList.add('product__weight');
      weight.textContent = product.weight + 'г';
      article.appendChild(weight);

      const addButton = document.createElement('button');
      addButton.classList.add('product__add');
      addButton.classList.add('product__added'); // add product added
      addButton.setAttribute('type', 'button');
      addButton.textContent = 'Добавить';
      article.appendChild(addButton);

      li.appendChild(article);
      catalog.appendChild(li);

      img.addEventListener('click', () => {
        modalTitle.textContent = product.title;
        modalImage.src = product.image;

        modalProductDescription.textContent = product.description;

        ingredientsList.innerHTML = '';
        product.ingredients.forEach(ingredient => {
          const li = document.createElement('li');
          li.classList.add('ingredients__items');
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
        });
        
        modal.classList.add('modal_open');
      });
    });
  }

  const defaultCategory = 'burger'; 
  showProducts(defaultCategory);
  
  navigationButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigationButtons.forEach(btn => {
        btn.classList.remove('navigation__button_active');
      });

      button.classList.add('navigation__button_active');


      const category = button.parentNode.dataset.category;
      showProducts(category);

      const categoryTitle = document.getElementById('categoryTitle');
      categoryTitle.textContent = button.textContent;
    });
  });

  // closeButton.addEventListener('click', () => {
  //   console.log('close');
  //   modal.classList.remove('modal_open');
  // });

  // document.addEventListener('click', (event) => {
  //   if (event.target === modals) {
  //     modal.classList.remove('modal_open');
  //   }
  // });

  })
    .catch((error) => {
      console.error(error)
    })




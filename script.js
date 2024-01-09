

fetch('/db.json')
.then((response) => {
  if (response.ok) return response.json()
  throw new Error(response.statusText || response.status)
})
.then((data) => {
  const navigationButtons = document.querySelectorAll('.navigation__button');
  const catalog = document.querySelector('.catalog__list');
  const modal = document.querySelector('.modal');
  const modalTitle = document.querySelector('.modal-product__title');
  const modalImage = document.querySelector('.modal-product__image');
  const modalProductDescription = document.querySelector('.modal-product__description');
  const ingredientsList = document.querySelector('.ingredients');
  const closeButton = document.querySelector('.modal__close');
  const skipButton = document.querySelector('.order__close');
  let totalAmount = 0;
  let totalCount = 0;
  let totalAmountModal = 0;

  skipButton.addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
  })

  document.querySelector('.order__wrap-title').addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
  })

  catalog.addEventListener('click', (event) => {
    if (event.target.classList.contains('product__add')) {
      const product = event.target.closest('.product');
      if (product?.dataset?.id) {
        const productData = data.find(p => p.id === product?.dataset?.id);
        const title = productData.title;
        const weight = productData.weight;
        const price = productData.price;
  
        totalAmount += productData.price;
        totalCount++;
        updateOrderSummary();
  
        const item = createOrderItem(productData.image, title, weight, price, 1);
        orderList.appendChild(item);
      }
    }
  });

  catalog.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-product__btn')) {
    const product = event.target.closest('.modal-product');
    if (product?.dataset?.id) {
      const productData = data.find(p => p.id === product?.dataset?.id);
      const title = productData.title;
      const weight = productData.weight;
      const price = productData.price;
      const amountElement = product.querySelector('.count__amount');
      const amount = parseInt(amountElement.textContent);

      totalAmount += price * amount;
      totalCount += amount;
      updateOrderSummary();

      const item = createOrderItem(productData.image, title, weight, price, amount);
      orderList.appendChild(item);
    }
  }
  });
  
  function handleModalCountMinus(event) {
    const amountElement = event.target.nextElementSibling;
    let amount = parseInt(amountElement.textContent);
    if (amount > 0) {
      amount--;
      amountElement.textContent = amount;
      const priceElementModal = event.target.closest('.order__item').querySelector('.modal-product__price');
      const priceModal = parseInt(priceElementModal.textContent);
      totalAmountModal -= priceModal;
      updateOrderSummary();
    }
  }
  
  function handleModalCountPlus(event) {
    const amountElement = event.target.previousElementSibling;
    let amount = parseInt(amountElement.textContent);
    if (amount < 20) {
      amount++;
      amountElement.textContent = amount;
      const priceElementModal = event.target.closest('.order__item').querySelector('.modal-product__price');
      const priceModal = parseInt(priceElementModal.textContent);
      totalAmountModal += priceModal;
      updateOrderSummary();
    }
  }
  
  const modalCountMinusBtn = document.querySelector('.modal-product__count .count__minus');
  const modalCountPlusBtn = document.querySelector('.modal-product__count .count__plus');
  
  modalCountMinusBtn.addEventListener('click', handleModalCountMinus);
  modalCountPlusBtn.addEventListener('click', handleModalCountPlus);
  
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
      }
      updateOrderSummary();
    }
  }
  
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

  closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_open');
  });

  document.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('modal_open');
    }
  });

  })
    .catch((error) => {
      console.error(error)
    })



//         const navigationButtons = document.querySelectorAll('.navigation__button');
//         const catalog = document.querySelector('.catalog__list');
//         const modal = document.querySelector('.modal');
//         const modalTitle = document.querySelector('.modal-product__title');
//         const modalImage = document.querySelector('.modal-product__image');
//         const modalProductDescription = document.querySelector('.modal-product__description');
//         const ingredientsList = document.querySelector('.ingredients');
//         const closeButton = document.querySelector('.modal__close');
//         const addToCartButtons = document.querySelectorAll('.product__add');
//         const orderList = document.querySelector('.order__list');

//         function showProducts(category) {
//           catalog.innerHTML = '';

//           const filteredProducts = data.filter(item => item.category === category);

//           filteredProducts.forEach(product => {
//             const li = document.createElement('li');
//             li.classList.add('catalog__item');

//             const article = document.createElement('article');
//             article.classList.add('product');

//             const img = document.createElement('img');
//             img.classList.add('product__image');
//             img.src = product.image;
//             img.alt = product.title;
//             article.appendChild(img);

//             const price = document.createElement('p');
//             price.classList.add('product__price');
//             price.textContent = product.price;
//             const currency = document.createElement('span');
//             currency.classList.add('currency');
//             currency.textContent = '₽';
//             price.appendChild(currency);
//             article.appendChild(price);

//             const title = document.createElement('h3');
//             title.classList.add('product__title');
//             const detailButton = document.createElement('button');
//             detailButton.classList.add('product__detail');
//             detailButton.textContent = product.title;
//             title.appendChild(detailButton);
//             article.appendChild(title);

//             const weight = document.createElement('p');
//             weight.classList.add('product__weight');
//             weight.textContent = product.weight + 'г';
//             article.appendChild(weight);

//             const addButton = document.createElement('button');
//             addButton.classList.add('product__add');
//             addButton.setAttribute('type', 'button');
//             addButton.textContent = 'Добавить';
//             article.appendChild(addButton);

//             li.appendChild(article);
//             catalog.appendChild(li);

//             img.addEventListener('click', () => {
//               modalTitle.textContent = product.title;
//               modalImage.src = product.image;

//               modalProductDescription.textContent = product.description;

//               ingredientsList.innerHTML = '';
//               product.ingredients.forEach(ingredient => {
//                 const li = document.createElement('li');
//                 li.classList.add('ingredients__items');
//                 li.textContent = ingredient;
//                 ingredientsList.appendChild(li);
//               });
              
//               modal.classList.add('modal_open');
//             });
//           });
//         }

//         const defaultCategory = 'burger'; 
//         showProducts(defaultCategory);

//         navigationButtons.forEach(button => {
//           button.addEventListener('click', () => {
//             navigationButtons.forEach(btn => {
//               btn.classList.remove('navigation__button_active');
//             });

//             button.classList.add('navigation__button_active');


//             const category = button.parentNode.dataset.category;
//             showProducts(category);

//             const categoryTitle = document.getElementById('categoryTitle');
//             categoryTitle.textContent = button.textContent;
//           });
//         });

//         closeButton.addEventListener('click', () => {
//           modal.classList.remove('modal_open');
//         });

//         document.addEventListener('click', (event) => {
//           if (event.target === modal) {
//             modal.classList.remove('modal_open');
//           }
//         });

//         addToCartButtons.forEach((button) => {
//           button.addEventListener('click', () => {
            
//             const card = button.closest('.product');
//             const title = card.querySelector('.product__title button').textContent;
//             const weight = card.querySelector('.product__weight').textContent;
//             const price = parseFloat(card.querySelector('.product__price').textContent);
        
            
//             const item = document.createElement('li');
//             item.classList.add('order__item');
        
            
//             item.innerHTML = `
//               <img class="order__image" src="img/burger-1-1.jpg" alt="Супер сырный">
//               <div class="order__product">
//                 <h3 class="order__product-title">${title}</h3>
//                 <p class="order__product-weight">${weight}</p>
//                 <p class="order__product-price">${price}<span class="currency">₽</span></p>
//               </div>
//               <div class="order__product-count count">
//                 <button class="count__minus">-</button>
//                 <p class="count__amount">1</p>
//                 <button class="count__plus">+</button>
//               </div>
//             `;
        
//             orderList.appendChild(item);
//           });
//         });

        

//       } else {
//         console.error('Ошибка запроса: ' + request.status);
//       }
//     }
//   };
//   request.send();
// });


// const buttons = document.querySelectorAll('.navigation__button');

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     // Удаляем класс у всех кнопок
//     buttons.forEach(btn => {
//       btn.classList.remove('navigation__button_active');
//     });

//     // Добавляем класс на активную кнопку
//     button.classList.add('navigation__button_active');
//   });
// });

// function fetchData() {
//   fetch('db.json') 
//     .then(response => response.json())
//     .then(data => {
//       updateUI(data);
//     })
//     .catch(error => console.error('Ошибка при загрузке данных:', error));
// }

// function updateUI(data) {
//   let container = document.getElementById('dataContainer');
//   container.innerHTML = '';

//   data.forEach(function(item) {
//     let article = document.createElement('article');
//   article.classList.add('product');

  
//   let img = document.createElement('img');
//   img.classList.add('product__image');
//   img.src = item.image;
//   img.alt = item.title;
//   article.appendChild(img);

  
//   let price = document.createElement('p');
//   price.classList.add('product__price');
//   price.textContent = item.price + '₽';
//   article.appendChild(price);

  
//   let title = document.createElement('h3');
//   title.classList.add('product__title');
//   let detailButton = document.createElement('button');
//   detailButton.classList.add('product__detail');
//   detailButton.textContent = item.title;
//   title.appendChild(detailButton);
//   article.appendChild(title);

  
//   let weight = document.createElement('p');
//   weight.classList.add('product__weight');
//   weight.textContent = item.weight + 'г';
//   article.appendChild(weight);

  
//   let addButton = document.createElement('button');
//   addButton.classList.add('product__add');
//   addButton.type = 'button';
//   addButton.textContent = 'Добавить';
//   article.appendChild(addButton);

  
//   container.appendChild(article);
//   });
// }

// let request = new XMLHttpRequest();
// request.open('GET', 'db.json', true);
// request.onreadystatechange = function() {
//   if (request.readyState === 4 && request.status === 200) {
//     let data = JSON.parse(request.responseText);
    
//     console.log(data);

//     data.forEach(item => {
      
//     });
//   }
// };
// request.send();
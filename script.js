document.querySelector('.order__wrap-title').addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
})



document.addEventListener('DOMContentLoaded', function() {
  let request = new XMLHttpRequest();
  request.open('GET', 'db.json', true);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText);

        console.log(data);

        const navigationButtons = document.querySelectorAll('.navigation__button');
        const catalog = document.querySelector('.catalog__list');

        function showProducts(category) {
          catalog.innerHTML = '';

          const filteredProducts = data.filter(item => item.category === category);

          filteredProducts.forEach(product => {
            const li = document.createElement('li');
            li.classList.add('catalog__item');

            const article = document.createElement('article');
            article.classList.add('product');

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
          });
        }

        const defaultCategory = 'burgers'; 
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
      } else {
        console.error('Ошибка запроса: ' + request.status);
      }
    }
  };
  request.send();
});



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
document.querySelector('.order__wrap-title').addEventListener('click', () => {
    document.querySelector('.order').classList.toggle('order_open')
})

const buttons = document.querySelectorAll('.navigation__button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Удаляем класс у всех кнопок
    buttons.forEach(btn => {
      btn.classList.remove('navigation__button_active');
    });

    // Добавляем класс на активную кнопку
    button.classList.add('navigation__button_active');
  });
});

function fetchData() {
  fetch('db.json') 
    .then(response => response.json())
    .then(data => {
      updateUI(data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
}

function updateUI(data) {
  let container = document.getElementById('dataContainer');
  container.innerHTML = '';

  data.forEach(function(item) {
    let article = document.createElement('article');
  article.classList.add('product');

  
  let img = document.createElement('img');
  img.classList.add('product__image');
  img.src = 'img/burger-6.jpg';
  img.alt = item.name;
  article.appendChild(img);

  
  let price = document.createElement('p');
  price.classList.add('product__price');
  price.textContent = item.price + '₽';
  article.appendChild(price);

  
  let title = document.createElement('h3');
  title.classList.add('product__title');
  let detailButton = document.createElement('button');
  detailButton.classList.add('product__detail');
  detailButton.textContent = item.name;
  title.appendChild(detailButton);
  article.appendChild(title);

  
  let weight = document.createElement('p');
  weight.classList.add('product__weight');
  weight.textContent = item.weight + 'г';
  article.appendChild(weight);

  
  let addButton = document.createElement('button');
  addButton.classList.add('product__add');
  addButton.type = 'button';
  addButton.textContent = 'Добавить';
  article.appendChild(addButton);

  
  container.appendChild(article);
  });
}


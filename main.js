import "./style.css";

const LIMBO_PRODUCTS = [
  {
    name: "Italian Cooking Class",
    price: 50,
    seller: "Cooking Academy",
    image: "./public/1.jpg",
  },
  {
    name: "Pottery Workshop",
    price: 30,
    seller: "Pottery Area",
    image: "./public/2.jpg",
  },
  {
    name: "Sushi Making Course",
    price: 40,
    seller: "Cooking Academy",
    image: "./public/3.jpg",
  },
  {
    name: "French Pastry Masterclass",
    price: 60,
    seller: "Cooking Academy",
    image: "./public/4.jpg",
  },
  {
    name: "Ceramic Sculpture Course",
    price: 35,
    seller: "Pottery Area",
    image: "./public/5.jpg",
  },
  {
    name: "Mediterranean Cuisine Workshop",
    price: 45,
    seller: "Cooking Academy",
    image: "./public/6.jpg",
  },
  {
    name: "Candle Making workshop",
    price: 25,
    seller: "Creative Arts Studio",
    image: "./public/7.jpg",
  },
  {
    name: "Thai Cooking Experience",
    price: 55,
    seller: "Green Cooking",
    image: "./public/8.jpg",
  },
  {
    name: "Drawing course",
    price: 50,
    seller: "Creative Arts Studio",
    image: "./public/9.jpg",
  },
  {
    name: "Vegetarian Cooking Class",
    price: 40,
    seller: "Green Cooking",
    image: "./public/10.jpg",
  },
];

const createProductElement = (product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productName = document.createElement("h2");
  productName.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.textContent = `${product.price}€`;

  const productSeller = document.createElement("p");
  productSeller.textContent = `By ${product.seller}`;

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.name;

  productElement.appendChild(productName);
  productElement.appendChild(productPrice);
  productElement.appendChild(productSeller);
  productElement.appendChild(productImage);

  return productElement;
}

const addHTML = (html) => {
  document.body.innerHTML += html;
}

addHTML(`
  <header class="container">
    <h1>Limbo</h1>
    <button id="menu-toggle"><img src="./public/assets/toggle.png" alt=""></button>
    <nav>
      <ul class='nav-list'>
        <li><a href='#'>Home</a></li>
        <li><a href='#courses'>Courses</a></li>
        <li><a href='#workshops'>Workshops</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
  </header>
`);

addHTML(`
<section>
<p>Immerse yourself in the art of cooking, pottery, and drawing with our diverse range of in-person courses. Elevate your skills and discover the joy of self-expression through hands-on experiences in culinary, ceramic, and artistic pursuits. Join Limbo for an enriching journey of skill enhancement and creative fulfillment.</p>
</section>
<div id="filter-container">
  <div id="sellers">
    <select id="seller-select">
      <option value="Allsellers">All Sellers</option>
      <option value="Cooking Academy">Cooking Academy</option>
      <option value="Creative Arts Studio">Creative Arts Studio</option>
      <option value="Pottery Area">Pottery Area</option>
      <option value="Green Cooking">Green Cooking</option>
    </select>
  </div>
  <div id="filter-btns">
    <input id="in-price" type="number" min="25" placeholder="Price">
    <button id="btn-search">Search</button>
    <button id="btn-reset">Reset</button>
  </div>
</div>
`);

const divContainer = document.createElement("div");
divContainer.id = "products-container";

LIMBO_PRODUCTS.forEach(product => {
  const productElement = createProductElement(product);
  divContainer.appendChild(productElement);
});

document.body.appendChild(divContainer);

addHTML(`
  <footer>
    <div class="footer-content">
      <p>&copy; 2023 Limbo</p>
      <p>Created by <a target="_blank" href="https://www.linkedin.com/in/rociodomjim/">Rocío Domínguez</a></p>
  </footer>
`);

// FILTERS BY PRICE AND SELLER

const filterByPrice = () => {
  const maxPrice = Number(document.querySelector("#in-price").value);
  const filteredProductsByPrice = LIMBO_PRODUCTS.filter(
    (product) => product.price <= maxPrice
  );

  renderProducts(filteredProductsByPrice);
};

const listenerPrice = document.querySelector("#btn-search");
listenerPrice.addEventListener("click", filterByPrice);

const filterBySeller = () => {
  const selectedSeller = document.querySelector('#seller-select').value;
  if (selectedSeller === "Allsellers") {
    renderProducts(LIMBO_PRODUCTS);
  } else {
    const filteredBySeller = LIMBO_PRODUCTS.filter(
      (product) => product.seller === selectedSeller
    );
    renderProducts(filteredBySeller);
  }
}

const listenerSeller = document.querySelector("#seller-select");
listenerSeller.addEventListener("change", filterBySeller);

const priceAndSellerFilter = () => {
  const maxPrice = Number(document.querySelector("#in-price").value);
  const selectedSeller = document.querySelector('#seller-select').value;

  const filteredProducts = LIMBO_PRODUCTS.filter(
    (product) => product.price <= maxPrice
      && (selectedSeller === "Allsellers" || product.seller === selectedSeller)
  );

  renderProducts(filteredProducts);
};

const listenerPriceAndSeller = document.querySelector("#btn-search");
listenerPriceAndSeller.addEventListener("click", priceAndSellerFilter);

const renderProducts = (products) => {
  const divContainer = document.getElementById("products-container");
  divContainer.innerHTML = "";

  products.forEach(product => {
    const productElement = createProductElement(product);
    divContainer.appendChild(productElement);
  });
};

// RESET VALUES

const priceInput = document.querySelector('#in-price');
const resetButton = document.querySelector('#btn-reset');

resetButton.addEventListener('click', () => {
  renderProducts(LIMBO_PRODUCTS);
  priceInput.value = '';
});

const sellerOption = document.querySelector('#seller-select');
const resetInput = document.querySelector('#btn-reset');

resetInput.addEventListener('click', () => {
  sellerOption.value = "Allsellers"
});

// MOBILE MENU

const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
});

navList.addEventListener("click", (event) => {
  if (event.target.tagName === 'A') {
    navList.classList.remove("active");
  }
});
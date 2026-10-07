import { products } from "./catalog.js?v=2";

const productGrid = document.querySelector("#product-grid");

function productImage(product) {
  return `<img class="product-photo" src="${product.image}" alt="${product.name} in ${product.color}" loading="lazy" />`;
}

function productCard(product, index) {
  return `<article class="product-card ${index === 0 ? "featured" : ""}">
    <div class="product-image">${productImage(product)}<span class="product-number">0${index + 1}</span></div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <div class="product-title"><h3>${product.name}</h3><strong>${product.price}</strong></div>
      <p class="product-color">${product.color}</p>
      <ul>${product.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
      <button type="button" class="product-select" data-product="${product.sku}">Ask Lace about ${product.name} <span aria-hidden="true">↗</span></button>
    </div>
  </article>`;
}

function renderCatalog() {
  productGrid.innerHTML = products.map(productCard).join("");
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product]");
    if (!button) return;
    const product = products.find((item) => item.sku === button.dataset.product);
    document.querySelector("#support").scrollIntoView({ behavior: "smooth" });
    document.querySelector(".assistant-details p").textContent = `You selected ${product.name}. When you call, ask Lace about ${product.sku}, choose a size from 6 through 12, and share your SMS offer code.`;
  });
}

renderCatalog();

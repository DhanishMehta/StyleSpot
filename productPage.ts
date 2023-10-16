const innerHTMLProdContent = (product: Product) => {
    let returnHTMLContent =
    `<div class="image-container p-3 h-25"><img src="${product.image}" alt="" class="w-100" style="max-width: 30vw; max-height: 70vh"></div>
    <div class="details-container d-flex flex-column p-5 w-75 h-25 justify-content-start">
        <div class="prodCategory fs-6 text-orange">${product.category}</div>
        <div class="prodTitle fs-3 fw-bold">${product.title}</div>
        <div class="prodDesc fs-5 mb-3">${product.description}</div>
        <div class="price-tag fs-3 fw-bold py-3"><span class="text-orange">$</span> ${product.price}</div>
        <button onclick="cartObject.addToCart(${product.id})" class="addToCart-btn btn btn-orange w-25 fs-4 text-center fw-medium text-light d-flex justify-content-center">Add to Cart</button>
        <div class="quantity-btn d-none align-items-center justify-content-center w-25 p-1 fs-4 btn">
            <button onclick="cartObject.removeFromCart(${product.id})" class="btn btn-outline-secondary fw-bold text-center">-</button>
            <span class="item-quantity w-50 px-3 text-center">1</span>
            <button onclick="cartObject.addToCart(${product.id})" class="btn btn-outline-orange fw-bold text-center">+</button>
        </div>
    </div>`
    return returnHTMLContent;
}

function showProductPage(){
    let urlSearchId = window.location.search;
    const prodId = parseInt(urlSearchId.slice(4));
    const [prodData] = JSON.parse(
        window.localStorage.getItem("ProductData")
      );
    
    const product = prodData.find(({ id }) => id == prodId)
    document.getElementById("individual-product-container").innerHTML = ""+innerHTMLProdContent(product);
    cartObject.updateCartButton(product.id);
}

showProductPage();
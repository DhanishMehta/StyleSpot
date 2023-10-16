type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};

const apiLink = "https://fakestoreapi.com/products";
const products: Array<Product> = [];

async function getProducts() {
  try {
    const productsResponse = await fetch(apiLink);
    const productsData = await productsResponse.json();
    productsData.forEach((element: any) => {
      let p: Product = {
        id: element.id,
        title: element.title,
        price: element.price,
        description: element.description,
        category: element.category,
        image: element.image,
        rating: element.rating,
      };
      products.push(p);
    });
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

let innerHTMLContent = (product: Product) => {
  let returnHTML = `
  <div id="${product.id}" class="text-decoration-none card m-3 col-8 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3" onMouseOver="this.style = 'background-color: #F8F9FA'" onMouseOut="this.style ='background-color: #FFF'">
        <div style="height: 200px" class="product-img-container m-3 d-flex align-items-center justify-content-center">
            <img src="${product.image}" class="card-img-top w-75" style="max-width: 150px; max-height: 200px" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title text-truncate fw-bold">${product.title}</h5>
            <p class="card-text fw-light" style="max-height: 200px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow:hidden;">${product.description}</p>
            <div class="d-flex flex-column align-items-center justify-content-center">
                <h3 class="card-text">$ ${product.price}</h3>
                <button onclick="cartObject.addToCart(${product.id})" class="addToCart-btn btn btn-orange bg">Add to Cart</button>
                <div class="quantity-btn d-none align-items-center justify-content-center">
                  <button onclick="cartObject.removeFromCart(${product.id})" class="btn btn-outline-secondary">-</button>
                  <span class="item-quantity w-50 px-3">1</span>
                  <button onclick="cartObject.addToCart(${product.id})" class="btn btn-outline-orange">+</button>
                </div>
                <div class="mt-3"><a href="./product.html?id=${product.id}" class="text-decoration-none fs-6 text-orange">View More details</a></div>
            </div>
        </div>
        </div>`;
  return returnHTML;
};

getProducts().then((res) => {
  console.log(products);
  window.localStorage.setItem("ProductData", JSON.stringify([products]));
  res.forEach((p: Product) => {
    document
      .querySelector("#products-container")
      .insertAdjacentHTML("beforeend", innerHTMLContent(p));

    let categoryString = (p.category).replace(/ /g,'')

    document.getElementById(`${categoryString}-container`).insertAdjacentHTML("beforeend", innerHTMLContent(p));

    cartObject.updateCartButton(p.id);
  });
});
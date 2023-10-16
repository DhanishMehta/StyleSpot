type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};

type cartProduct = {
  productId: number;
  quantity: number;
  totPrice: number;
};

let orderSummaryInnerHTML = (p: Product, totPrice: number) => {
  let returnHTMLcontent = `
  <div class="row container item-container h-auto bg-light" id="cart-item-prodid-${p.id}">
            <div class="col-6 bg-light product-details d-flex">
                <div class="col-3 product-image-container" style="width: 100px; height: 100px;"><img src="${p.image}" alt="" class="p-3" style="max-width: 100%; max-height: 100%;"></div>
                <div class="col-9 d-flex flex-column justify-content-center">
                    <div class="product-title fs-5 fw-semibold lh-sm">${p.title}</div>
                    <div class="product-category fs-6 fw-light text-orange lh-1">${p.category}</div>
                </div>
            </div>
            <button onclick="cartObject.addToCart(${p.id})" class="d-none addToCart-btn btn btn-orange">Add to Cart</button>
            <div class="col-2 btn quantity-btn d-flex align-items-center justify-content-center">
                <button onclick="cartObject.removeFromCart(${p.id})" class="btn btn-outline-secondary fs-3">-</button>
                <span class="item-quantity w-50 px-3 text-center fs-3 fw-light">1</span>
                <button onclick="cartObject.addToCart(${p.id})" class="btn btn-outline-orange fs-3">+</button>
            </div>
            <div class="col-2 fs-4 fw-light bg-light text-center my-auto price">$ ${p.price}</div>
            <div class="col-2 fs-4 fw-light bg-light text-center my-auto price">$ ${totPrice}</div>
        </div>`;
  return returnHTMLcontent;
};

class cart {
  cartProductItems: Array<cartProduct>;
  productsData: Array<Product>;

  constructor() {
    let tempCartArr = JSON.parse(window.localStorage.getItem("cart"));
    if (tempCartArr === null) {
      this.cartProductItems = [];
    } else {
      [this.cartProductItems] = tempCartArr;
    }
    [this.productsData] = JSON.parse(
      window.localStorage.getItem("ProductData")
    );
  }

  updateLocalStorage() {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([this.cartProductItems])
    );
  }

  updateCartButton(prod: number) {
    let page = window.location.pathname;
    if (page.startsWith("/index")) {
      let card = document.getElementById(`${prod}`);
      let prodAddToCartBtn = card.children[1].children[2].children[1];
      let productQuantityBtn = card.children[1].children[2].children[2];
      let quantityNo = productQuantityBtn.children[1];
    } else if (page.startsWith("/product")) {
      let card = document.getElementById(`individual-product-container`);
      let prodAddToCartBtn = card.children[1].children[4];
      let productQuantityBtn = card.children[1].children[5];
      let quantityNo = productQuantityBtn.children[1];
    } else if (page.startsWith("/checkout")) {
      console.log("In update cart button: /checkout page");
      let card = document.getElementById(`cart-item-prodid-${prod}`);
      console.log("st1 done");
      let prodAddToCartBtn = card.children[1];
      console.log("st2 done");
      let productQuantityBtn = card.children[2];
      console.log("st3 done");
      let quantityNo = productQuantityBtn.children[1];
      console.log("st4 done");
    } else {
      let card = document.getElementById(`${prod}`);
      let prodAddToCartBtn = card.children[1].children[2].children[1];
      let productQuantityBtn = card.children[1].children[2].children[2];
      let quantityNo = productQuantityBtn.children[1];
    }

    const index = this.cartProductItems.findIndex((obj) => {
      return obj.productId === prod;
    });

    //If quantity is more than zero
    if (index != -1) {
      prodAddToCartBtn.classList.add("d-none");
      productQuantityBtn.classList.remove("d-none");
      productQuantityBtn.classList.add("d-flex");
      quantityNo.innerHTML = "" + this.cartProductItems[index].quantity;
    } else {
      prodAddToCartBtn.classList.remove("d-none");
      prodAddToCartBtn.classList.add("d-flex");
      productQuantityBtn.classList.remove("d-flex");
      productQuantityBtn.classList.add("d-none");
    }
  }

  addToCart(productIdToAdd: number) {
    if (this.productsData.find(({ id }) => id == productIdToAdd) == undefined) {
      console.log("Item not found in Product list");
      return;
    }

    const index = this.cartProductItems.findIndex((obj) => {
      return obj.productId === productIdToAdd;
    });

    //if the product already is in cart
    if (index != -1) {
      this.cartProductItems[index].quantity++;
    } else {
      let newItem: cartProduct = {
        productId: productIdToAdd,
        quantity: 1,
      };
      this.cartProductItems.push(newItem);
    }

    this.updateCartButton(productIdToAdd);
    this.updateLocalStorage();

    console.log(`Added to cart: ${productIdToAdd}`);

    if (window.location.pathname.startsWith("/checkout")) {
      window.location.reload();
    }
  }

  removeFromCart(productIdToRemove: number) {
    if (
      this.productsData.find(({ id }) => id == productIdToRemove) == undefined
    ) {
      console.log("Item not found in Product list");
      return;
    }

    const index = this.cartProductItems.findIndex((obj) => {
      return obj.productId === productIdToRemove;
    });

    // if Item not found in cart list
    if (index === -1) {
      console.log("Item not present in the Cart");
      return;
    }

    this.cartProductItems[index].quantity--;
    console.warn("Deleted item");
    if (this.cartProductItems[index].quantity <= 0) {
      this.cartProductItems.splice(index, 1);
      console.warn("Item quatity = 0");
      if (window.location.pathname.startsWith(`/checkout`)) {
        console.log("generating checkout page after deletion of item");
        if (this.cartProductItems.length != 0) {
          this.generateCheckoutPage();
        } else {
          window.location.href = "./index.html";
        }
      }
    }

    this.updateCartButton(productIdToRemove);
    this.updateLocalStorage();
    if (window.location.pathname.startsWith("/checkout")) {
      window.location.reload();
    }
  }

  showCart() {
    console.log(this.cartProductItems);
  }

  calculateTotal() {
    let totalAmount = 0;
    this.cartProductItems.forEach((pdt) => {
      const index = this.productsData.find(({ id }) => id == pdt.productId);
      pdt.totPrice = index.price * pdt.quantity;
      totalAmount = totalAmount + pdt.totPrice;
    });
    return totalAmount;
  }

  generateCheckoutPage() {
    //If we are not in the checkout page
    if (!window.location.pathname.startsWith("/checkout")) {
      return;
    }
    // If there are 0 cart products
    if (this.cartProductItems.length === null) {
      document.querySelector(
        "#checkout-product-container"
      ).innerHTML = `<div class="row text-secondary">Cart is empty</div>`;
      return;
    }

    let totalAmount = this.calculateTotal();

    let container = document.querySelector("#checkout-product-container");
    let elementToPush = "";
    this.cartProductItems.forEach((pdt) => {
      const product = this.productsData.find(({ id }) => id == pdt.productId);
      elementToPush += orderSummaryInnerHTML(product, pdt.totPrice);
    });
    container.innerHTML = elementToPush;
    this.cartProductItems.forEach((pdt) => {
      const product = this.productsData.find(({ id }) => id == pdt.productId);
      cartObject.updateCartButton(product.id);
    });
    console.log("here before statement");
    let totalAmountElement = document.getElementById("checkoutTotalPrice");
    totalAmountElement.textContent = "$ " + totalAmount;
  }

  clearCart(){
    this.cartProductItems = [];
  }

  handlePayment() {
    let totAmount = this.calculateTotal();
    var options = {
      key: "rzp_test_oqThOrnwSgMJmz", // Enter the Key ID generated from the Dashboard
      amount: totAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert("Payment Successful" + response);
        this.clearCart();
        
        window.location.href="./index.html";
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    document.getElementById("rzp-button1").onclick = function (e) {
      rzp1.open();
      e.preventDefault();
    };
  }
}

var cartObject = new cart();
cartObject.generateCheckoutPage();

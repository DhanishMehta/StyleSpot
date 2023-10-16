var orderSummaryInnerHTML = function (p, totPrice) {
    var returnHTMLcontent = "\n  <div class=\"row container item-container h-auto bg-light\" id=\"cart-item-prodid-".concat(p.id, "\">\n            <div class=\"col-6 bg-light product-details d-flex\">\n                <div class=\"col-3 product-image-container\" style=\"width: 100px; height: 100px;\"><img src=\"").concat(p.image, "\" alt=\"\" class=\"p-3\" style=\"max-width: 100%; max-height: 100%;\"></div>\n                <div class=\"col-9 d-flex flex-column justify-content-center\">\n                    <div class=\"product-title fs-5 fw-semibold lh-sm\">").concat(p.title, "</div>\n                    <div class=\"product-category fs-6 fw-light text-orange lh-1\">").concat(p.category, "</div>\n                </div>\n            </div>\n            <button onclick=\"cartObject.addToCart(").concat(p.id, ")\" class=\"d-none addToCart-btn btn btn-orange\">Add to Cart</button>\n            <div class=\"col-2 btn quantity-btn d-flex align-items-center justify-content-center\">\n                <button onclick=\"cartObject.removeFromCart(").concat(p.id, ")\" class=\"btn btn-outline-secondary fs-3\">-</button>\n                <span class=\"item-quantity w-50 px-3 text-center fs-3 fw-light\">1</span>\n                <button onclick=\"cartObject.addToCart(").concat(p.id, ")\" class=\"btn btn-outline-orange fs-3\">+</button>\n            </div>\n            <div class=\"col-2 fs-4 fw-light bg-light text-center my-auto price\">$ ").concat(p.price, "</div>\n            <div class=\"col-2 fs-4 fw-light bg-light text-center my-auto price\">$ ").concat(totPrice, "</div>\n        </div>");
    return returnHTMLcontent;
};
var cart = /** @class */ (function () {
    function cart() {
        var tempCartArr = JSON.parse(window.localStorage.getItem("cart"));
        if (tempCartArr === null) {
            this.cartProductItems = [];
        }
        else {
            this.cartProductItems = tempCartArr[0];
        }
        this.productsData = JSON.parse(window.localStorage.getItem("ProductData"))[0];
    }
    cart.prototype.updateLocalStorage = function () {
        window.localStorage.setItem("cart", JSON.stringify([this.cartProductItems]));
    };
    cart.prototype.updateCartButton = function (prod) {
        var page = window.location.pathname;
        if (page.startsWith("/index")) {
            var card = document.getElementById("".concat(prod));
            var prodAddToCartBtn = card.children[1].children[2].children[1];
            var productQuantityBtn = card.children[1].children[2].children[2];
            var quantityNo = productQuantityBtn.children[1];
        }
        else if (page.startsWith("/product")) {
            var card = document.getElementById("individual-product-container");
            var prodAddToCartBtn = card.children[1].children[4];
            var productQuantityBtn = card.children[1].children[5];
            var quantityNo = productQuantityBtn.children[1];
        }
        else if (page.startsWith("/checkout")) {
            console.log("In update cart button: /checkout page");
            var card = document.getElementById("cart-item-prodid-".concat(prod));
            console.log("st1 done");
            var prodAddToCartBtn = card.children[1];
            console.log("st2 done");
            var productQuantityBtn = card.children[2];
            console.log("st3 done");
            var quantityNo = productQuantityBtn.children[1];
            console.log("st4 done");
        }
        else {
            var card = document.getElementById("".concat(prod));
            var prodAddToCartBtn = card.children[1].children[2].children[1];
            var productQuantityBtn = card.children[1].children[2].children[2];
            var quantityNo = productQuantityBtn.children[1];
        }
        var index = this.cartProductItems.findIndex(function (obj) {
            return obj.productId === prod;
        });
        //If quantity is more than zero
        if (index != -1) {
            prodAddToCartBtn.classList.add("d-none");
            productQuantityBtn.classList.remove("d-none");
            productQuantityBtn.classList.add("d-flex");
            quantityNo.innerHTML = "" + this.cartProductItems[index].quantity;
        }
        else {
            prodAddToCartBtn.classList.remove("d-none");
            prodAddToCartBtn.classList.add("d-flex");
            productQuantityBtn.classList.remove("d-flex");
            productQuantityBtn.classList.add("d-none");
        }
    };
    cart.prototype.addToCart = function (productIdToAdd) {
        if (this.productsData.find(function (_a) {
            var id = _a.id;
            return id == productIdToAdd;
        }) == undefined) {
            console.log("Item not found in Product list");
            return;
        }
        var index = this.cartProductItems.findIndex(function (obj) {
            return obj.productId === productIdToAdd;
        });
        //if the product already is in cart
        if (index != -1) {
            this.cartProductItems[index].quantity++;
        }
        else {
            var newItem = {
                productId: productIdToAdd,
                quantity: 1,
            };
            this.cartProductItems.push(newItem);
        }
        this.updateCartButton(productIdToAdd);
        this.updateLocalStorage();
        console.log("Added to cart: ".concat(productIdToAdd));
        if (window.location.pathname.startsWith("/checkout")) {
            window.location.reload();
        }
    };
    cart.prototype.removeFromCart = function (productIdToRemove) {
        if (this.productsData.find(function (_a) {
            var id = _a.id;
            return id == productIdToRemove;
        }) == undefined) {
            console.log("Item not found in Product list");
            return;
        }
        var index = this.cartProductItems.findIndex(function (obj) {
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
            if (window.location.pathname.startsWith("/checkout")) {
                console.log("generating checkout page after deletion of item");
                if (this.cartProductItems.length != 0) {
                    this.generateCheckoutPage();
                }
                else {
                    window.location.href = "./index.html";
                }
            }
        }
        this.updateCartButton(productIdToRemove);
        this.updateLocalStorage();
        if (window.location.pathname.startsWith("/checkout")) {
            window.location.reload();
        }
    };
    cart.prototype.showCart = function () {
        console.log(this.cartProductItems);
    };
    cart.prototype.calculateTotal = function () {
        var _this = this;
        var totalAmount = 0;
        this.cartProductItems.forEach(function (pdt) {
            var index = _this.productsData.find(function (_a) {
                var id = _a.id;
                return id == pdt.productId;
            });
            pdt.totPrice = index.price * pdt.quantity;
            totalAmount = totalAmount + pdt.totPrice;
        });
        return totalAmount;
    };
    cart.prototype.generateCheckoutPage = function () {
        var _this = this;
        //If we are not in the checkout page
        if (!window.location.pathname.startsWith("/checkout")) {
            return;
        }
        // If there are 0 cart products
        if (this.cartProductItems.length === null) {
            document.querySelector("#checkout-product-container").innerHTML = "<div class=\"row text-secondary\">Cart is empty</div>";
            return;
        }
        var totalAmount = this.calculateTotal();
        var container = document.querySelector("#checkout-product-container");
        var elementToPush = "";
        this.cartProductItems.forEach(function (pdt) {
            var product = _this.productsData.find(function (_a) {
                var id = _a.id;
                return id == pdt.productId;
            });
            elementToPush += orderSummaryInnerHTML(product, pdt.totPrice);
        });
        container.innerHTML = elementToPush;
        this.cartProductItems.forEach(function (pdt) {
            var product = _this.productsData.find(function (_a) {
                var id = _a.id;
                return id == pdt.productId;
            });
            cartObject.updateCartButton(product.id);
        });
        console.log("here before statement");
        var totalAmountElement = document.getElementById("checkoutTotalPrice");
        totalAmountElement.textContent = "$ " + totalAmount;
    };
    cart.prototype.clearCart = function () {
        this.cartProductItems = [];
    };
    cart.prototype.handlePayment = function () {
        var totAmount = this.calculateTotal();
        var options = {
            key: "rzp_test_oqThOrnwSgMJmz",
            amount: totAmount * 100,
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: "",
            handler: function (response) {
                alert("Payment Successful" + response);
                this.clearCart();
                window.location.href = "./index.html";
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "Gaurav Kumar",
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
    };
    return cart;
}());
var cartObject = new cart();
cartObject.generateCheckoutPage();

var innerHTMLProdContent = function (product) {
    var returnHTMLContent = "<div class=\"image-container p-3 h-25\"><img src=\"".concat(product.image, "\" alt=\"\" class=\"w-100\" style=\"max-width: 30vw; max-height: 70vh\"></div>\n    <div class=\"details-container d-flex flex-column p-5 w-75 h-25 justify-content-start\">\n        <div class=\"prodCategory fs-6 text-orange\">").concat(product.category, "</div>\n        <div class=\"prodTitle fs-3 fw-bold\">").concat(product.title, "</div>\n        <div class=\"prodDesc fs-5 mb-3\">").concat(product.description, "</div>\n        <div class=\"price-tag fs-3 fw-bold py-3\"><span class=\"text-orange\">$</span> ").concat(product.price, "</div>\n        <button onclick=\"cartObject.addToCart(").concat(product.id, ")\" class=\"addToCart-btn btn btn-orange w-25 fs-4 text-center fw-medium text-light d-flex justify-content-center\">Add to Cart</button>\n        <div class=\"quantity-btn d-none align-items-center justify-content-center w-25 p-1 fs-4 btn\">\n            <button onclick=\"cartObject.removeFromCart(").concat(product.id, ")\" class=\"btn btn-outline-secondary fw-bold text-center\">-</button>\n            <span class=\"item-quantity w-50 px-3 text-center\">1</span>\n            <button onclick=\"cartObject.addToCart(").concat(product.id, ")\" class=\"btn btn-outline-orange fw-bold text-center\">+</button>\n        </div>\n    </div>");
    return returnHTMLContent;
};
function showProductPage() {
    var urlSearchId = window.location.search;
    var prodId = parseInt(urlSearchId.slice(4));
    var prodData = JSON.parse(window.localStorage.getItem("ProductData"))[0];
    var product = prodData.find(function (_a) {
        var id = _a.id;
        return id == prodId;
    });
    document.getElementById("individual-product-container").innerHTML = "" + innerHTMLProdContent(product);
    cartObject.updateCartButton(product.id);
}
showProductPage();

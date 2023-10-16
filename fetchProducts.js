var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiLink = "https://fakestoreapi.com/products";
var products = [];
function getProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var productsResponse, productsData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(apiLink)];
                case 1:
                    productsResponse = _a.sent();
                    return [4 /*yield*/, productsResponse.json()];
                case 2:
                    productsData = _a.sent();
                    productsData.forEach(function (element) {
                        var p = {
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
                    return [2 /*return*/, products];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
var innerHTMLContent = function (product) {
    var returnHTML = "\n  <div id=\"".concat(product.id, "\" class=\"text-decoration-none card m-3 col-8 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3\" onMouseOver=\"this.style = 'background-color: #F8F9FA'\" onMouseOut=\"this.style ='background-color: #FFF'\">\n        <div style=\"height: 200px\" class=\"product-img-container m-3 d-flex align-items-center justify-content-center\">\n            <img src=\"").concat(product.image, "\" class=\"card-img-top w-75\" style=\"max-width: 150px; max-height: 200px\" alt=\"...\">\n        </div>\n        <div class=\"card-body\">\n            <h5 class=\"card-title text-truncate fw-bold\">").concat(product.title, "</h5>\n            <p class=\"card-text fw-light\" style=\"max-height: 200px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow:hidden;\">").concat(product.description, "</p>\n            <div class=\"d-flex flex-column align-items-center justify-content-center\">\n                <h3 class=\"card-text\">$ ").concat(product.price, "</h3>\n                <button onclick=\"cartObject.addToCart(").concat(product.id, ")\" class=\"addToCart-btn btn btn-orange bg\">Add to Cart</button>\n                <div class=\"quantity-btn d-none align-items-center justify-content-center\">\n                  <button onclick=\"cartObject.removeFromCart(").concat(product.id, ")\" class=\"btn btn-outline-secondary\">-</button>\n                  <span class=\"item-quantity w-50 px-3\">1</span>\n                  <button onclick=\"cartObject.addToCart(").concat(product.id, ")\" class=\"btn btn-outline-orange\">+</button>\n                </div>\n                <div class=\"mt-3\"><a href=\"./product.html?id=").concat(product.id, "\" class=\"text-decoration-none fs-6 text-orange\">View More details</a></div>\n            </div>\n        </div>\n        </div>");
    return returnHTML;
};
getProducts().then(function (res) {
    console.log(products);
    window.localStorage.setItem("ProductData", JSON.stringify([products]));
    res.forEach(function (p) {
        document
            .querySelector("#products-container")
            .insertAdjacentHTML("beforeend", innerHTMLContent(p));
        var categoryString = (p.category).replace(/ /g, '');
        document.getElementById("".concat(categoryString, "-container")).insertAdjacentHTML("beforeend", innerHTMLContent(p));
        cartObject.updateCartButton(p.id);
    });
});

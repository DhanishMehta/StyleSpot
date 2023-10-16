if (window.location.pathname.startsWith("/checkout")) {
    document.body.addEventListener("click", function (event) {
        var index = event.target.id;
        console.log(event);
        console.log(index);
    });
}
